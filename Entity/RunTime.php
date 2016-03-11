<?php
/**
 * RunTime Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use BFolliot\Date\DateInterval;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * RunTime
 *
 * @ORM\Table(name="JOE_RUN_TIME")
 * @ORM\Entity
 */
class RunTime extends AbstractTime
{

    /**
     * @var boolean
     *
     * @ORM\Column(name="once", type="boolean")
     */
    protected $once = false;

    /**
     * @var string
     *
     * @ORM\Column(name="time_zone", type="string", length=255, nullable=true)
     */
    protected $timeZone;

    /**
     * @var string
     *
     * @ORM\Column(name="schedule", type="string", length=255, nullable=true)
     */
    protected $schedule;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="Period", cascade={"all"})
     * @ORM\JoinTable(name="JOE_RUN_TIME_PERIODS",
     *      joinColumns={@ORM\JoinColumn(name="run_time_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="period_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $periods;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="At", cascade={"all"})
     * @ORM\JoinTable(name="JOE_RUN_TIME_ATS",
     *      joinColumns={@ORM\JoinColumn(name="run_time_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="at_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $ats;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="Date", cascade={"all"})
     * @ORM\JoinTable(name="JOE_RUN_TIME_DATES",
     *      joinColumns={@ORM\JoinColumn(name="run_time_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="date_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $dates;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="Weekdays", cascade={"all"})
     * @ORM\JoinTable(name="JOE_RUN_TIME_WEEKDAYS_COLLECTION",
     *      joinColumns={@ORM\JoinColumn(name="run_time_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="weekdays_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $weekdaysCollection;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="Monthday", cascade={"all"})
     * @ORM\JoinTable(name="JOE_RUN_TIME_MONTHDAY_COLLECTION",
     *      joinColumns={@ORM\JoinColumn(name="run_time_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="monthday_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $monthdayCollection;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="Month", cascade={"all"})
     * @ORM\JoinTable(name="JOE_RUN_TIME_MONTH",
     *      joinColumns={@ORM\JoinColumn(name="run_time_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="month_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $monthCollection;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="Ultimos", cascade={"all"})
     * @ORM\JoinTable(name="JOE_RUN_TIME_ULTIMOS",
     *      joinColumns={@ORM\JoinColumn(name="run_time_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="ultimos_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $ultimosCollection;

    /**
     * @var Holidays
     *
     * @ORM\OneToOne(targetEntity="Holidays", cascade={"all"})
     * @ORM\JoinColumn(name="holidays_id", referencedColumnName="id")
     */
    protected $holidays;

    /**
     * Constructor
     *
     */
    public function __construct()
    {
        $this->periods            = new ArrayCollection;
        $this->ats                = new ArrayCollection;
        $this->dates              = new ArrayCollection;
        $this->weekdaysCollection = new ArrayCollection;
        $this->monthdayCollection = new ArrayCollection;
        $this->monthCollection    = new ArrayCollection;
        $this->ultimosCollection  = new ArrayCollection;
        return parent::__construct();
    }

    /**
     * Set once
     *
     * @param boolean $once
     *
     * @return RunTime
     */
    public function setOnce($once)
    {
        $this->once = $once;

        return $this;
    }

    /**
     * Get once
     *
     * @return boolean
     */
    public function getOnce()
    {
        return $this->once;
    }

    /**
     * Set timeZone
     *
     * @param string $timeZone
     *
     * @return RunTime
     */
    public function setTimeZone($timeZone)
    {
        $this->timeZone = $timeZone;

        return $this;
    }

    /**
     * Get timeZone
     *
     * @return string
     */
    public function getTimeZone()
    {
        return $this->timeZone;
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
     * Get At collection
     *
     * @return ArrayCollection
     */
    public function getAts()
    {
        return $this->ats;
    }

    /**
     * Set At collection
     *
     * @param ArrayCollection $at
     *
     * @return self
     */
    public function setAts(ArrayCollection $ats)
    {
        $this->ats = $ats;
        return $this;
    }

    /**
     * Add at in collection
     *
     * @param at $period
     *
     * @return self
     */
    public function addAt(At $at)
    {
        $this->ats[] = $at;
        return $this;
    }

    /**
     * Get Date collection
     *
     * @return ArrayCollection
     */
    public function getDates()
    {
        return $this->dates;
    }

    /**
     * Set Date collection
     *
     * @param ArrayCollection $dates
     *
     * @return self
     */
    public function setDates(ArrayCollection $dates)
    {
        $this->dates = $dates;
        return $this;
    }

    /**
     * Add Date in collection
     *
     * @param Date $date
     *
     * @return self
     */
    public function addDate(Date $date)
    {
        $this->dates[] = $date;
        return $this;
    }

    /**
     * Get WeekdaysCollection collection
     *
     * @return ArrayCollection
     */
    public function getWeekdaysCollection()
    {
        return $this->weekdaysCollection;
    }

    /**
     * Set WeekdaysCollection collection
     *
     * @param ArrayCollection $weekdaysCollection
     *
     * @return self
     */
    public function setWeekdaysCollection(ArrayCollection $weekdaysCollection)
    {
        $this->weekdaysCollection = $weekdaysCollection;
        return $this;
    }

    /**
     * Add WeekdaysCollection in collection
     *
     * @param WeekdaysCollection $date
     *
     * @return self
     */
    public function addWeekdays(Weekdays $weekdays)
    {
        $this->weekdaysCollection[] = $weekdays;
        return $this;
    }

    /**
     * Get MonthdayCollection collection
     *
     * @return ArrayCollection
     */
    public function getMonthdayCollection()
    {
        return $this->monthdayCollection;
    }

    /**
     * Set MonthdayCollection collection
     *
     * @param ArrayCollection $monthdayCollection
     *
     * @return self
     */
    public function setMonthdayCollection(ArrayCollection $monthdayCollection)
    {
        $this->monthdayCollection = $monthdayCollection;
        return $this;
    }

    /**
     * Add Monthday in collection
     *
     * @param MonthdayCollection $monthday
     *
     * @return self
     */
    public function addMonthday(Monthday $monthday)
    {
        $this->monthdayCollection[] = $monthday;
        return $this;
    }

    /**
     * Get MonthCollection collection
     *
     * @return ArrayCollection
     */
    public function getMonthCollection()
    {
        return $this->monthCollection;
    }

    /**
     * Set MonthCollection collection
     *
     * @param ArrayCollection $monthCollection
     *
     * @return self
     */
    public function setMonthCollection(ArrayCollection $monthCollection)
    {
        $this->monthCollection = $monthCollection;
        return $this;
    }

    /**
     * Add Month in collection
     *
     * @param Month $month
     *
     * @return self
     */
    public function addMonth(Month $month)
    {
        $this->monthCollection[] = $month;
        return $this;
    }

    /**
     * Get ultimosCollection
     *
     * @return ArrayCollection
     */
    public function getUltimosCollection()
    {
        return $this->ultimosCollection;
    }

    /**
     * Set ultimosCollection
     *
     * @param ArrayCollection $ultimosCollection
     *
     * @return self
     */
    public function setUltimosCollection(ArrayCollection $ultimosCollection)
    {
        $this->ultimosCollection = $ultimosCollection;
        return $this;
    }

    /**
     * Add Ultimos in collection
     *
     * @param Ultimos $ultimos
     *
     * @return self
     */
    public function addUltimos(Ultimos $ultimos)
    {
        $this->ultimosCollection[] = $ultimos;
        return $this;
    }

    /**
     * Gets the value of holidays.
     *
     * @return Holidays
     */
    public function getHolidays()
    {
        return $this->holidays;
    }

    /**
     * Sets the value of holidays.
     *
     * @param Holidays $holidays the holidays
     *
     * @return self
     */
    public function setHolidays(Holidays $holidays)
    {
        $this->holidays = $holidays;

        return $this;
    }

    /**
     * Gets the value of schedule.
     *
     * @return string
     */
    public function getSchedule()
    {
        return $this->schedule;
    }

    /**
     * Sets the value of schedule.
     *
     * @param string $schedule the schedule
     *
     * @return self
     */
    public function setSchedule($schedule)
    {
        $this->schedule = $schedule;

        return $this;
    }
}
