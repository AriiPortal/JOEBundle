<?php
/**
 * Job Service.
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Service;

use Arii\JOEBundle\Entity\JobScheduler as JobSchedulerEntity;
use Aura\Payload\PayloadFactory;
use Aura\Payload_Interface\PayloadStatus;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Ramsey\Uuid\Uuid;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class Job extends AbstractService
{
    public function getEntityName()
    {
        return \Arii\JOEBundle\Entity\Job::class;
    }

    public function getEventName()
    {
        return \Arii\JOEBundle\Event\Job::class;
    }

    public function getEventCollectionName()
    {
        return \Arii\JOEBundle\Event\JobCollection::class;
    }
}
