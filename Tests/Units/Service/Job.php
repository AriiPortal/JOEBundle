<?php

namespace Arii\JOEBundle\Tests\Units\Service;

use Arii\JOEBundle\Entity\Job as Entity;
use Arii\JOEBundle\Service\Job as Service;
use atoum\AtoumBundle\Test\Units;
use Aura\Payload\PayloadFactory;
use Aura\Payload_Interface\PayloadStatus;

class Job extends Units\Test
{

    protected $em;
    protected $validator;
    protected $repository;

    protected $nonExistentUuid = '7e57d004-2b97-0e7a-b45f-5387367791cd';
    protected $existingUuid    = '7e57d004-2b97-0e7a-b45f-5387367791ce';

    public function testInitService()
    {
        $this->object($this->getService())
            ->isTestedInstance();
    }

    public function testCreate()
    {
        $entity = new Entity;
        $result = $this->getService()->create($entity);
        $this
            ->object($result)
                ->isInstanceOf('Aura\\Payload\\Payload')
            ->variable($result->getStatus())
                ->isEqualTo(PayloadStatus::CREATED)
            ->object($result->getOutput())
                ->isInstanceOf(Entity::class);
    }

    public function testCreateNotUnique()
    {
        $this->calling($this->getValidatorMock())->validate = array('Error');
        $entity = new Entity;
        $result = $this->getService()->create($entity);
        $this
            ->object($result)
                ->isInstanceOf('Aura\\Payload\\Payload')
            ->variable($result->getStatus())
                ->isEqualTo(PayloadStatus::NOT_VALID);
    }

    public function testFetchExist()
    {
        $result = $this->getService()->fetch(\Ramsey\Uuid\Uuid::fromString($this->existingUuid));

        $this
            ->object($result)
                ->isInstanceOf('Aura\\Payload\\Payload')
            ->variable($result->getStatus())
                ->isEqualTo(PayloadStatus::FOUND)
            ->object($result->getOutput())
                ->isInstanceOf(Entity::class);
    }

    public function testFetchEmpty()
    {
        $result = $this->getService()->fetch(\Ramsey\Uuid\Uuid::fromString($this->nonExistentUuid));

        $this
            ->object($result)
                ->isInstanceOf('Aura\\Payload\\Payload')
            ->variable($result->getStatus())
                ->isEqualTo(PayloadStatus::NOT_FOUND);
    }


    public function testFetchAll()
    {
        $this->calling($this->getRepositoryMock())->findAll = array(
            new Entity,
        );

        $result = $this->getService()->fetchAll();

        $this
            ->object($result)
                ->isInstanceOf('Aura\\Payload\\Payload')
            ->variable($result->getStatus())
                ->isEqualTo(PayloadStatus::FOUND)
            ->array($result->getOutput());
    }


    public function testFetchAllEmpty()
    {
        $result = $this->getService()->fetchAll();

        $this
            ->object($result)
                ->isInstanceOf('Aura\\Payload\\Payload')
            ->variable($result->getStatus())
                ->isEqualTo(PayloadStatus::NOT_FOUND);
    }

    public function testUpdate()
    {
        $result = $this->getService()->create(new Entity);
        $result->getOutput()->setName('testUpdated');

        $resultUpdated = $this->getService()->update($result->getOutput());

        $this
            ->object($resultUpdated)
                ->isInstanceOf('Aura\\Payload\\Payload')
            ->variable($resultUpdated->getStatus())
                ->isEqualTo(PayloadStatus::UPDATED)
            ->object($resultUpdated->getOutput())
                ->isInstanceOf(Entity::class)
            ->variable($resultUpdated->getOutput()->getName())
                ->isEqualTo('testUpdated');
    }

    public function testUpdateNotValid()
    {

        $result = $this->getService()->create(new Entity);
        $result->getOutput()->setName('testUpdated');

        $this->calling($this->getValidatorMock())->validate = array('Error');

        $resultUpdated = $this->getService()->update($result->getOutput());

        $this
            ->object($resultUpdated)
                ->isInstanceOf('Aura\\Payload\\Payload')
            ->variable($resultUpdated->getStatus())
                ->isEqualTo(PayloadStatus::NOT_VALID);
    }

    public function testDelete()
    {
        $entity = $this->getService()->create(new Entity);
        $result = $this->getService()->delete($entity->getOutput());

        $this
            ->object($result)
                ->isInstanceOf('Aura\\Payload\\Payload')
            ->variable($result->getStatus())
                ->isEqualTo(PayloadStatus::DELETED);
    }

    protected function getService()
    {
        return $this->newTestedInstance(
            $this->getEmMock(),
            $this->getEventDispatcherMock(),
            new PayloadFactory,
            $this->getValidatorMock()
        );
    }

    protected function getEmMock()
    {
        if (empty($this->em)) {
            $this->em = new \mock\Doctrine\ORM\EntityManager();
            $this->calling($this->em)->getRepository = $this->getRepositoryMock();
            $this->calling($this->em)->flush         = true;
            $this->calling($this->em)->merge         = function ($entity) {
                return $entity;
            };
        }
        return $this->em;
    }

    protected function getEventDispatcherMock()
    {
        $mock  = new \mock\Symfony\Component\EventDispatcher\EventDispatcher();
        return $mock;
    }

    protected function getValidatorMock()
    {
        if (empty($this->validator)) {
            $this->validator  = new \mock\Symfony\Component\Validator\Validator\ValidatorInterface();
        }
        return $this->validator;
    }

    protected function getRepositoryMock()
    {
        if (empty($this->repository)) {
            $existingUuid = $this->existingUuid;
            $this->mockGenerator->orphanize('__construct');
            $this->mockGenerator->shuntParentClassCalls();
            $this->repository = new \mock\Doctrine\ORM\EntityRepository();
            $this->repository->getMockController()->find = function ($id) use ($existingUuid) {
                if ($id == \Ramsey\Uuid\Uuid::fromString($existingUuid)) {
                    return new Entity('Existing record');
                }
                return null;
            };
            $this->repository->getMockController()->findAll = array();
        }
        return $this->repository;
    }
}
