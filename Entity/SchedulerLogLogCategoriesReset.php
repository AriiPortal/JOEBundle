<?php
/**
 * SchedulerLogLogCategoriesReset Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * SchedulerLogLogCategoriesReset
 *
 * @ORM\Table(name="JOE_SCHEDULER_LOG_LOG_CATEGORIES_RESET")
 * @ORM\Entity
 */
class SchedulerLogLogCategoriesReset extends AbstractEntity
{

    /**
     * @var integer
     *
     * @ORM\Column(name="delay", type="integer")
     */
    protected $delay;

    /**
     * Gets the value of delay.
     *
     * @return integer
     */
    public function getDelay()
    {
        return $this->delay;
    }

    /**
     * Sets the value of delay.
     *
     * @param integer $delay the delay
     *
     * @return self
     */
    public function setDelay($delay)
    {
        $this->delay = $delay;

        return $this;
    }
}
