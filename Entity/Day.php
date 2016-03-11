<?php
/**
 * Day Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Day
 *
 * @ORM\Table(name="JOE_DAY")
 * @ORM\Entity
 */
class Day extends AbstractEntity
{

    /**
     * @var integer
     *
     * @ORM\Column(name="day", type="integer")
     */
    protected $day;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="Period", cascade={"all"})
     * @ORM\JoinTable(name="JOE_RUN_TIME_DAY_PERIODS",
     *      joinColumns={@ORM\JoinColumn(name="day_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="period_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $periods;

    /**
     * Constructor
     *
     */
    public function __construct()
    {
        $this->periods = new ArrayCollection;
        return parent::__construct();
    }

    /**
     * Get Period collection
     *
     * @return ArrayCollection
     */
    public function getPeriods()
    {
        return $this->periods;
    }

    /**
     * Set Period collection
     *
     * @param ArrayCollection $periods
     *
     * @return self
     */
    public function setPeriods(ArrayCollection $periods)
    {
        $this->periods = $periods;
        return $this;
    }

    /**
     * Add Period in collection
     *
     * @param Period $period
     *
     * @return self
     */
    public function addPeriod(Period $period)
    {
        $this->periods[] = $period;
        return $this;
    }

    /**
     * Gets the value of day.
     *
     * @return integer
     */
    public function getDay()
    {
        return $this->day;
    }

    /**
     * Sets the value of day.
     *
     * @param integer $day the day
     *
     * @return self
     */
    public function setDay($day)
    {
        $this->day = $day;

        return $this;
    }
}
