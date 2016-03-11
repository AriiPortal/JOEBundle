<?php
/**
 * Weekday Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Weekday
 *
 * @ORM\Table(name="JOE_WEEKDAY")
 * @ORM\Entity
 */
class Weekday extends AbstractEntity
{

    /**
     * @var integer
     *
     * @ORM\Column(name="which", type="integer")
     */
    protected $which;

    /**
     * @var string
     *
     * @ORM\Column(name="day", type="string")
     */
    protected $day;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="Period", cascade={"all"})
     * @ORM\JoinTable(name="JOE_RUN_TIME_WEEKDAY_PERIODS",
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
     * Gets the value of which.
     *
     * @return integer
     */
    public function getWhich()
    {
        return $this->which;
    }

    /**
     * Sets the value of which.
     *
     * @param integer $which the which
     *
     * @return self
     */
    protected function setWhich($which)
    {
        $this->which = $which;

        return $this;
    }

    /**
     * Gets the value of day.
     *
     * @return string
     */
    public function getDay()
    {
        return $this->day;
    }

    /**
     * Sets the value of day.
     *
     * @param string $day the day
     *
     * @return self
     */
    protected function setDay($day)
    {
        $this->day = $day;

        return $this;
    }
}
