<?php

namespace Arii\JOEBundle\Tests\Units\Entity;

use atoum\AtoumBundle\Test\Units;

abstract class AbstractEntity extends Units\Test
{

    public function testInitService()
    {
        $this
            ->given($this->newTestedInstance())
            ->then()
                ->object($this->testedInstance)
                    ->isTestedInstance();
    }

    public function testId()
    {
        $this
            ->given($this->newTestedInstance())
            ->then()
                ->object($this->testedInstance->getId())
                    ->isInstanceOf('Ramsey\\Uuid\\Uuid');
    }
}
