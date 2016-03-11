<?php
/**
 * Weekdays Entity
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
 * @ORM\Table(name="JOE_RUN_TIME_WEEKDAYS")
 * @ORM\Entity
 */
class Weekdays extends AbstractEntity
{

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="Day", cascade={"all"})
     * @ORM\JoinTable(name="JOE_RUN_TIME_WEEKDAYS_DAYS",
     *      joinColumns={@ORM\JoinColumn(name="weekdays_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="day_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $days;

    /**
     * Constructor
     *
     */
    public function __construct()
    {
        $this->days = new ArrayCollection;
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
}
