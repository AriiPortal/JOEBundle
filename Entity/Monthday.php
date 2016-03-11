<?php
/**
 * Monthday Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Monthday
 *
 * @ORM\Table(name="JOE_RUN_TIME_MONTHDAYS")
 * @ORM\Entity
 */
class Monthday extends AbstractEntity
{

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="Day", cascade={"all"})
     * @ORM\JoinTable(name="JOE_RUN_TIME_MONTHDAYS_DAYS",
     *      joinColumns={@ORM\JoinColumn(name="monthday_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="day_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $days;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="Weekday", cascade={"all"})
     * @ORM\JoinTable(name="JOE_RUN_TIME_MONTHDAYS_WEEKDAY",
     *      joinColumns={@ORM\JoinColumn(name="monthday_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="weekday_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $weekdayCollection;

    /**
     * Constructor
     *
     */
    public function __construct()
    {
        $this->days              = new ArrayCollection;
        $this->weekdayCollection = new ArrayCollection;
        return parent::__construct();
    }

    /**
     * Get Day collection
     *
     * @return ArrayCollection
     */
    public function getDays()
    {
        return $this->days;
    }

    /**
     * Set Day collection
     *
     * @param ArrayCollection $days
     *
     * @return self
     */
    public function setDays(ArrayCollection $days)
    {
        $this->days = $days;
        return $this;
    }

    /**
     * Add Day in collection
     *
     * @param Day $day
     *
     * @return self
     */
    public function addDay(Day $day)
    {
        $this->days[] = $day;
        return $this;
    }

    /**
     * Get Weekday collection
     *
     * @return ArrayCollection
     */
    public function getWeekdays()
    {
        return $this->weekdayCollection;
    }

    /**
     * Set Weekday collection
     *
     * @param ArrayCollection $weekdayCollection
     *
     * @return self
     */
    public function setWeekdays(ArrayCollection $weekdayCollection)
    {
        $this->weekdayCollection = $weekdayCollection;
        return $this;
    }

    /**
     * Add Weekday in collection
     *
     * @param Weekday $weekday
     *
     * @return self
     */
    public function addWeekday(Weekday $weekday)
    {
        $this->weekdayCollection[] = $weekday;
        return $this;
    }
}
