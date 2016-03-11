<?php

namespace Arii\JOEBundle\Tests\Units\Event;

use atoum\AtoumBundle\Test\Units;
use Aura\Payload\Payload;
use Aura\Payload_Interface\PayloadInterface;

abstract class AbstractEvent extends Units\Test
{

    public function testInitService()
    {
        $this->object($this->getInstance())
            ->isTestedInstance();
    }

    public function testGetTarget()
    {
        $this->object($this->getInstance()->getPayload())
            ->isInstanceOf(PayloadInterface::class);
    }

    public function testSetTarget()
    {
        $this->object(
            $this->getInstance()->setPayload(
                $this->getTarget()
            )
        )
            ->isTestedInstance();
        $this->testGetTarget();
    }

    protected function getInstance()
    {
        return $this->newTestedInstance(
            $this->getTarget()
        );
    }

    protected function getTarget()
    {
        return new Payload;
    }
}
