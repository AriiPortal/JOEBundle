<?php
/**
 * Job Service Factory.
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Service\Factory;

use Arii\JOEBundle\Service\Job as Service;
use Aura\Payload\PayloadFactory;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class Job
{
    public static function get(
        EntityManagerInterface $entityManager,
        EventDispatcherInterface $eventDispatcher,
        ValidatorInterface $validator
    ) {
        return new Service(
            $entityManager,
            $eventDispatcher,
            new PayloadFactory,
            $validator
        );
    }
}
