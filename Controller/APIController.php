<?php

namespace Arii\JOEBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Aura\Payload_Interface\PayloadStatus;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

use Arii\JoeXmlConnectorBundle\Converter\EntityToXML;

use Exception;

class APIController extends Controller
{

    private $entityNS = 'Arii\\JOEBundle\\Entity\\';

    private function getEntityClass($target)
    {
        $class = $this->entityNS . $target;

        if (!class_exists($class))
        {
            throw new Exception('Unknown Entity');
        }

        return $class;
    }

    private function getEntityService($target)
    {
        $services = array(
            'Job'      => 'arii_joe.job',
            'JobChain' => 'arii_joe.job_chain',
            'Order'    => 'arii_joe.order',
        );

        if (array_key_exists($target, $services))
        {
            return $this->container->get($services[$target]);
        }
        return null;
    }

    private function getEntityName($target)
    {
        $name = ucfirst($target);

        if (!class_exists($this->entityNS . $name))
        {
            throw new Exception("Unkown entity");
        }

        return $name;
    }

    private function getJobScheduler()
    {
        /* Return one hardcoded for now.
         * Maybe send info via session ? */
        $repository = $this->getDoctrine()->getRepository('AriiJOEBundle:JobScheduler');
        $sched = $repository->findOneByName('Core');

        return $sched;
    }

    private function getEntity($target, $id, $isDraft = false)
    {
        $entityService = $this->getEntityService($target);

        /* If we should fetch and we can do it
         * Only standalone entities (i.e. that have their
         * own XML) can be fetched */
        if ($entityService != null && !$isDraft)
        {
            $entityUuid = \Ramsey\Uuid\Uuid::fromString($id);
            $entityPayload = $entityService->fetch($entityUuid);

            if ($entityPayload->getStatus() == PayloadStatus::NOT_FOUND)
            {
                throw new Exception($entityService->getEntityNameShort()
                                    . " not found");
            }

            return $entityPayload->getOutput();
        }
        else
        {
            $repoName = 'AriiJOEBundle:' . $target;
            $repo = $this->getDoctrine()->getRepository($repoName);
            return $repo->find($id);
        }
    }


    private function updateEntity($entity)
    {
        $diff = $this->container->get('arii_joe.diff_update');
        $content = $this->get('request')->getContent();
        $json = $this->parseJSON($content);
        $diff->update($entity, $json);
    }

    private function createEntity($target, $isDraft = false)
    {
         $entityService = $this->getEntityService($target);
         $entity = null;

         if ($entityService != null && !$isDraft)
         {
             $sched = $this->getJobScheduler();
             $entity = $entityService->getNew($sched);

             $this->updateEntity($entity);

             $entityService->create($entity);
         }
         else
         {
             $classname = $this->getEntityClass($target);
             $entity = new $classname;

             /* Some entities have a JobScheduler that should be set
              * if we try to create such an entity we set the jobscheduler */
             $haveJobScheduler = array(
                 'Job', 'JobChain', 'Lock',
                 'Order', 'ProcessClass', 'Schedule'
             );

             if (in_array($target, $haveJobScheduler))
             {
                 $sched = $this->getJobScheduler();
                 $entity->setJobScheduler($sched);
             }

             $this->updateEntity($entity);

             $em = $this->getDoctrine()->getManager();
             $em->persist($entity);
             $em->flush();
         }

         return $entity;
    }

    public function createAction($target)
    {
        try
        {
            $name = $this->getEntityName($target);
            $entity = $this->createEntity($name);
            $json = $this->serializeToJson($entity);
            $response = new Response(json_encode($json));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
        catch (Exception $e)
        {
            return new Response("Error: " . $e->getMessage() . ".",
                                Response::HTTP_BAD_REQUEST);
        }
    }


    public function updateAction($target, $id)
    {
        try
        {
            $name = $this->getEntityName($target);
            $entity = $this->getEntity($name, $id);
            $entityService = $this->getEntityService($target);
            $this->updateEntity($entity);

            if ($entityService != null)
            {
                $entityService->update($entity);
            }
            else
            {
                $em = $this->getDoctrine()->getManager();
                $em->persist($entity);
                $em->flush();
            }

            $json = $this->serializeToJson($entity);

            $response = new Response(json_encode($json));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
        catch (Exception $e)
        {
            return new Response("Error: " . $e->getMessage() . ".",
                                Response::HTTP_BAD_REQUEST);
        }
    }

    public function removeAction($target, $id)
    {
        try
        {
            $name = $this->getEntityName($target);
            $entity = $this->getEntity($name, $id);
            $entityService = $this->getEntityService($name);

            if ($entityService != null)
            {
                $entityService->delete($entity);
            }
            else
            {
                $em = $this->getDoctrine()->getEntityManager();
                $em->remove($entity);
                $em->flush();
            }
        }
        catch (Exception $e)
        {
            return new Response("Error: " . $e->getMessage() . ".",
                                Response::HTTP_BAD_REQUEST);

        }
        return new Response("Success.");
    }


    private function parseJSON($data)
    {
        $diff = array();
        if (empty($data))
        {
            throw new Exception("No data received");
        }

        $diff = json_decode($data, true);

        if (is_null($diff))
        {
            throw new Exception("Can't decode json ("
                                . json_last_error_msg() . ")");
        }
        return $diff;
    }

    private function serializeToJson($entity, $selector = true)
    {
        /* If our selector is an array, this means there is
         * specific fields to be selected */
        if (is_array($selector))
        {
            $final = array();

            foreach ($selector as $k => $v)
            {
                /* If a field is not true or an array, we can discard it */
                if (!is_array($v) && $v != true) continue;

                $getMethodName = 'get'. ucfirst($k);


                if (method_exists($entity, $getMethodName))
                {
                    $sub = call_user_func(array ($entity, $getMethodName));

                    if (is_array($v))
                    {
                        if (is_null($sub))
                        {
                            $final[$k] = null;
                        }
                        /* We must check whether wanted entity is an object
                         * if not the selector is invalid */
                        else if (is_object($sub))
                        {
                            $final[$k] = $this->serializeToJson($sub, $v);
                        }
                        else
                        {
                            throw new Exception ("Attribute " . $k
                                                 . " is not an object");
                        }
                    }
                    else
                        $final[$k] = $this->serializeToJson($sub, $v);
                }
                else
                {
                    throw new Exception("Entity does not contain attribute "
                                        . $k);
                }
            }
            return $final;
        }
        /* If the selector is true, we dump everything */
        else if ($selector == true)
        {
            $objNorm = new ObjectNormalizer();
            $objNorm->setCircularReferenceHandler(function ($object) {
                /* If an object is referenced, in child just return it's id */
                return $object->getId();
            });

            $normalizers = array(
                new \GBProd\UuidNormalizer\UuidNormalizer(),
                $objNorm
            );

            $serializer = new Serializer($normalizers);
            return $serializer->normalize($entity, null);
        }
        /* Nothing selector, returning empty object {} */
        else
        {
            return array();
        }
    }

    public function jsonAction($target, $id)
    {
        try
        {
            $name = $this->getEntityName($target);
            $entity = $this->getEntity($name, $id);

            $content = $this->get('request')->getContent();

            $selector = $this->parseJSON($content);

            $json = $this->serializeToJson($entity, $selector);

            $response = new Response();
            $response->setContent(json_encode($json));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
        catch(Exception $e)
        {
            return new Response("Error: " . $e->getMessage() . ".",
                                Response::HTTP_BAD_REQUEST);
        }
    }

    public function listAction($target)
    {
        /* TODO: USE FETCHALL FOR THE COLLECTION ? */
        try
        {
            $name = $this->getEntityName($target);
            $repoName = 'AriiJOEBundle:' . $name;
            $repo = $this->getDoctrine()->getRepository($repoName);
            /* TODO: Filter by scheduler / spooler ? */
            $entities = $repo->findAll();


            $content = $this->get('request')->getContent();
            $selector = $this->parseJSON($content);

            $res = array();

            foreach($entities as $e)
            {
                $res[] = $this->serializeToJson($e, $selector);
            }


            $response = new Response();
            $response->setContent(json_encode($res));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
        catch(Exception $e)
        {
            return new Response("Error: " . $e->getMessage() . ".",
                                Response::HTTP_BAD_REQUEST);
        }
    }

    public function xmlAction($target, $id)
    {
        try
        {
            $whitelist = array("Job", "JobChain");
            $name = $this->getEntityName($target);

            if (in_array($name, $whitelist))
            {
                $classname = '\\Arii\\JoeXmlConnectorBundle'
                           . '\\Converter\\Specification\\'
                           . $name;

                $entity = $this->getEntity($name, $id);

                $converter = new EntityToXML(
                    $entity,
                    $classname
                );

                $xml = $converter->toXML();
                $response = new Response();
                $response->setContent($xml);
                $response->headers->set('Content-Type', 'text/xml');
                return $response;
            }
            else
            {
                throw new Exception("Entity cannot be exported as XML");
            }
        }
        catch(Exception $e)
        {
            return new Response("Error: " . $e->getMessage() . ".",
                                Response::HTTP_BAD_REQUEST);
        }
    }

}


?>