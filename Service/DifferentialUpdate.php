<?php

namespace Arii\JOEBundle\Service;

use Exception;
use InvalidArgumentException;
use Symfony\Component\Validator\ValidatorInterface;
use Doctrine\ORM\EntityManagerInterface;

use Doctrine\Common\Annotations\AnnotationReader;
use Doctrine\ORM\Mapping as ORM;


class DifferentialUpdate
{

    protected $validator;
    protected $entityManager;

    private $entityNamespace = 'Arii\\JOEBundle\\Entity\\';

    public function __construct(
        ValidatorInterface $validator,
        EntityManagerInterface $entityManager
    )
    {
        $this->validator = $validator;
        $this->entityManager = $entityManager;
    }

    private function is_assoc($arr)
    {
        return
            is_array($arr) &&
            array_keys($arr) !== range(0, count($arr) - 1) &&
            !is_null($arr) &&
            !empty($arr);
    }

    private function applyObject($entity, $name, $val)
    {
        /* We are dealing with a subobject */
        $getMethodName = 'get'. ucfirst($name);

        if (method_exists($entity, $getMethodName))
        {
            $sub = call_user_func(array ($entity, $getMethodName));

            if ($sub == null)
            {
                $entityClass = $this->entityNamespace . ucfirst($name);
                $sub = new $entityClass();

                $setMethodName = 'set' . ucfirst($name);
                call_user_func(array ($entity, $setMethodName), $sub);
            }

            $this->apply($sub, $val);
        }
        else
        {
            throw new Exception("Can't get object property ".$name);
        }
    }

    private function applyValue($entity, $name, $val)
    {
        /* It's an atomic value */
        $methodName = 'set'. ucfirst($name);

        if (method_exists($entity, $methodName))
        {
            call_user_func(array ($entity, $methodName), $val);
        }
        else
        {
            throw new Exception("Can't set value of property ".$name);
        }

    }

    private function getCollectionEntityName($entity, $name)
    {
        $reader = new AnnotationReader();
        $annotations = $reader->getPropertyAnnotations(
            new \ReflectionProperty(get_class($entity), $name)
        );

        foreach ($annotations as $a)
        {
            if ($a instanceof ORM\OneToMany ||
                $a instanceof ORM\ManyToMany )
            {
                return $a->targetEntity;
            }
        }
        throw new Exception("Property " . $name . " is not a collection");
    }

    private function applyCmd($entity, $name, $cmd, $val)
    {
        if ($cmd != '+' && $cmd != '-')
        {
            throw new Exception("Unknown command: ".$cmd);
        }

        $methodName = 'get' . ucfirst($name);

        if (method_exists($entity, $methodName))
        {
            $arr = call_user_func(array ($entity, $methodName));
            $entityName = $this->getCollectionEntityName($entity, $name);

            $repository = $this
                        ->entityManager
                        ->getRepository('AriiJOEBundle:' . $entityName);

            switch ($cmd)
            {
            case '+':
                /* We got a diff, so must create the entity */
                if (is_array($val))
                {
                    $entityClass = $this->entityNamespace . $entityName;
                    $entity = new $entityClass();
                    $this->apply($entity, $val);
                }
                else
                {
                    $entity = $repository->find($val);
                }

                $arr->add($entity);
                break;
            case '-':
                $entity = $repository->find($val);
                $arr->removeElement($entity);
                break;
            }
        }
        else
        {
            throw new Exception("Can't set value of property ".$name);
        }
    }

    /**
     * Apply a differential update on a given Entity
     *
     * @param  \Arii\JOEBundle\Entity\* $entity
     * @param  [Array encoded JSON object] $diff
     *
     * See the diffUpdate function for more details.
     */
    public function apply($entity, $diff)
    {
        if (is_null($entity))
        {
            throw new Exception("Can't update null entity");
        }

        if (is_array($diff))
        {
            /* We iterate over all json attributes */
            foreach ($diff as $k => $v)
            {
                $cmd = explode(':', $k);

                if (count($cmd) == 1)
                {
                    if ($this->is_assoc($v))
                    {
                        $this->applyObject($entity, $k, $v);
                    }
                    else
                    {
                        $this->applyValue($entity, $k, $v);
                    }
                }
                else if (count($cmd) == 2)
                {
                    $this->applyCmd($entity, $cmd[0], $cmd[1], $v);
                }
                else
                {
                    throw new Exception("Invalid property syntax");
                }
            }
        }
        else
        {
            throw new Exception("JSON object expected");
        }
    }

    /**
     * Perform a differential update on a given AbstractService.
     *
     * The target of the differential update is denoted by the $id.
     * The update data should be a valid json object, directly mapping the
     * entity structure.
     *
     * When an entity attribute is itself an attribute, its value should be
     * a valid json object.
     *
     * Example:
     * > {
     * >     "name": "Job's new name",
     * >     "script": {
     * >         "language": "java"
     * >     }
     * > }
     *
     * Will change a job name and script language...
     */
    public function update($entity, $diff)
    {
        $this->apply($entity, $diff);

        $errors = $this->validator->validate($entity);

        if (count($errors) > 0)
        {
            $errorsString = (string) $errors;
            throw new Exception($errorsString);
        }
    }

}
?>