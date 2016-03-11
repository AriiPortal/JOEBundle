<?php

namespace Arii\JOEBundle\Tests\Units\Entity;

use BFolliot\Date\DateInterval;

class Job extends AbstractEntity
{
    public function testIdleTimeout()
    {
        $this
            ->given($this->newTestedInstance())
            ->if($this->testedInstance->setIdleTimeout(new DateInterval('P2Y4DT6H8M')))
            ->then()
                ->object($this->testedInstance->getIdleTimeout())
                    ->isInstanceOf('BFolliot\\Date\\DateInterval');
    }

    public function testTimeout()
    {
        $this
            ->given($this->newTestedInstance())
            ->if($this->testedInstance->setTimeout(new DateInterval('P2Y4DT6H8M')))
            ->then()
                ->object($this->testedInstance->getTimeout())
                    ->isInstanceOf('BFolliot\\Date\\DateInterval');
    }
}
