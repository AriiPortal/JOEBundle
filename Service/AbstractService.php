<?php
/**
 * Abstract Service.
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Service;

use Arii\JOEBundle\Entity\JobScheduler as JobSchedulerEntity;
use Arii\JOEBundle\Entity\AbstractEntity;
use Aura\Payload\PayloadFactory;
use Aura\Payload_Interface\PayloadStatus;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Ramsey\Uuid\Uuid;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

abstract class AbstractService
{

    protected $entityManager;
    protected $eventDispatcher;
    protected $payloadFactory;
    protected $validator;
    protected $entityName;
    protected $eventName;
    protected $eventCollectionName;

    abstract public function getEntityName();
    abstract public function getEventName();
    abstract public function getEventCollectionName();

    public function __construct(
        EntityManagerInterface $entityManager,
        EventDispatcherInterface $eventDispatcher,
        PayloadFactory $payloadFactory,
        ValidatorInterface $validator
    ) {
        $this->entityManager       = $entityManager;
        $this->eventDispatcher     = $eventDispatcher;
        $this->payloadFactory      = $payloadFactory;
        $this->validator           = $validator;
        $this->entityName          = $this->getEntityName();
        $this->eventName           = $this->getEventName();
        $this->eventCollectionName = $this->getEventCollectionName();
    }

    /**
     * @param AbstractEntity $entity
     * @return Aura\Payload\Payload
     */
    public function create(AbstractEntity $entity)
    {
        if (!$entity instanceof $this->entityName) {
            throw new Exception('Input is not an instance of ' . $this->entityName);
        }

        $payload = $this->payloadFactory
            ->newInstance()
            ->setInput($entity);

        $event = new $this->eventName($payload);

        $this->eventDispatcher->dispatch(
            $event::ON_CREATE_PRE,
            $event
        );

        // Validate.
        $errors = $this->validator->validate($entity);

        if (count($errors) > 0) {
            $payload->setStatus(PayloadStatus::NOT_VALID)
                ->setOutput($entity)
                ->setMessages($errors);
            $event = new $this->eventName($payload);

            $this->eventDispatcher->dispatch(
                $event::ON_CREATE_ERROR,
                $event
            );
            return $payload;
        }

        // Save.
        $this->entityManager->persist($entity);
        $this->entityManager->flush();

        $payload->setStatus(PayloadStatus::CREATED)
            ->setOutput($entity);

        $event = new $this->eventName($payload);
        $this->eventDispatcher->dispatch(
            $event::ON_CREATE_POST,
            $event
        );
        return $payload;
    }

    /**
     * Return new entity.
     *
     * @param  \Arii\JOEBundle\Entity\JobScheduler $jobScheduler
     *
     * @return Entity
     */
    public function getNew(JobSchedulerEntity $jobScheduler)
    {
        $entity = new $this->entityName;
        $entity->setJobScheduler($jobScheduler);
        return $entity;
    }

    /**
     * @param Ramsey\Uuid\Uuid $id
     * @return Aura\Payload\Payload
     */
    public function fetch(Uuid $id)
    {
        $payload = $this->payloadFactory
            ->newInstance()
            ->setInput($id);

        $event = new $this->eventName($payload);
        $this->eventDispatcher->dispatch(
            $event::ON_FETCH_PRE,
            $event
        );

        $entity = $this->entityManager
            ->getRepository('AriiJOEBundle:Job')
            ->find($id);

        if (!$entity) {
            $payload
                ->setStatus(PayloadStatus::NOT_FOUND);

            $event = new $this->eventName($payload);
            $this->eventDispatcher->dispatch(
                $event::ON_FETCH_ERROR,
                $event
            );

            if ($payload->getStatus() == PayloadStatus::FOUND
                && $payload->getOutput() instanceof $this->entityName) {
                return $payload;
            }
            return $payload;
        }
        $payload
            ->setStatus(PayloadStatus::FOUND)
            ->setOutput($entity);

        $event = new $this->eventName($payload);
        $this->eventDispatcher->dispatch(
            $event::ON_FETCH_POST,
            $event
        );

        return $payload;
    }

    /**
     * Get all entity in $jobScheduler.
     *
     * @param Arii\JOEBundle\Entity\JobScheduler $jobScheduler
     *
     * @return Aura\Payload\Payload
     */
    public function fetchAll(JobSchedulerEntity $jobScheduler)
    {
        $payload = $this->payloadFactory->newInstance();
        $payload->setInput(array(
            'jobScheduler' => $jobScheduler,
        ));

        $event = new $this->eventCollectionName($payload);
        $this->eventDispatcher->dispatch(
            $event::ON_FETCH_PRE,
            $event
        );

        $collection = $this->entityManager
            ->getRepository('AriiJOEBundle:Job')
            ->findByJobScheduler($jobScheduler);


        if (!$collection) {
            $payload->setStatus(PayloadStatus::NOT_FOUND);

            $event = new $this->eventCollectionName($payload);
            $this->eventDispatcher->dispatch(
                $event::ON_FETCH_ERROR,
                $event
            );

            if ($payload->getStatus() == PayloadStatus::FOUND
                && $payload->getOutput() instanceof ArrayCollection) {
                return $payload;
            }
            return $payload;
        }


        $payload
            ->setStatus(PayloadStatus::FOUND)
            ->setOutput($collection);

        $event = new $this->eventCollectionName($payload);
        $this->eventDispatcher->dispatch(
            $event::ON_FETCH_POST,
            $event
        );
        return $payload;
    }

    /**
     * @param AbstractEntity $entity
     * @return Aura\Payload\Payload
     */
    public function update(AbstractEntity $entity)
    {
        if (!$entity instanceof $this->entityName) {
            throw new Exception('Input is not an instance of ' . $this->entityName);
        }
        $payload = $this->payloadFactory
            ->newInstance()
            ->setInput($entity);

        $event = new $this->eventName($payload);
        $this->eventDispatcher->dispatch(
            $event::ON_UPDATE_PRE,
            $event
        );

        $errors = $this->validator->validate($entity);
        if (count($errors) > 0) {
            $payload
                ->setStatus(PayloadStatus::NOT_VALID)
                ->setOutput($entity)
                ->setMessages($errors);

            $event = new $this->eventName($payload);
            $this->eventDispatcher->dispatch(
                $event::ON_UPDATE_ERROR,
                $event
            );

            return $payload;
        } else {
            $event = new $this->eventName($payload);
            $this->eventDispatcher->dispatch(
                $event::ON_UPDATE_VALID,
                $event
            );
        }

        $entity = $this->entityManager->merge($entity);
        $this->entityManager->flush();

        $payload
            ->setStatus(PayloadStatus::UPDATED)
            ->setOutput($entity);

        $event = new $this->eventName($payload);
        $this->eventDispatcher->dispatch(
            $event::ON_UPDATE_POST,
            $event
        );

        return $payload;
    }

    /**
     * @param AbstractEntity $entity
     * @return Aura\Payload\Payload
     */
    public function delete(AbstractEntity $entity)
    {
        if (!$entity instanceof $this->entityName) {
            throw new Exception('Input is not an instance of ' . $this->entityName);
        }
        $payload = $this->payloadFactory
            ->newInstance()
            ->setInput($entity);

        $event = new $this->eventName($payload);
        $this->eventDispatcher->dispatch(
            $event::ON_DELETE_PRE,
            $event
        );

        $this->entityManager->remove($entity);
        $this->entityManager->flush();
        $payload
            ->setStatus(PayloadStatus::DELETED);

        $event = new $this->eventName($payload);
        $this->eventDispatcher->dispatch(
            $event::ON_DELETE_POST,
            $event
        );

        return $payload;
    }
}
