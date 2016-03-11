<?php
/**
 * Month Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Month
 *
 * @ORM\Table(name="JOE_MONTH")
 * @ORM\Entity
 */
class Month extends AbstractEntity
{
    /**
     * @var string
     *
     * @Assert\NotBlank()
     * @Assert\Length(max=100)
     * @ORM\Column(name="month", type="string", length=100)
     */
    protected $month;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="Period", cascade={"all"})
     * @ORM\JoinTable(name="JOE_RUN_TIME_MONTH_PERIODS",
     *      joinColumns={@ORM\JoinColumn(name="month_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="period_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $periodCollection;

    /**
     * @var Monthday
     *
     * @ORM\OneToOne(targetEntity="Monthday", cascade={"all"})
     * @ORM\JoinColumn(name="monthday_id", referencedColumnName="id")
     */
    private $monthday;

    /**
     * @var Ultimos
     *
     * @ORM\OneToOne(targetEntity="Ultimos", cascade={"all"})
     * @ORM\JoinColumn(name="ultimos_id", referencedColumnName="id")
     */
    private $ultimos;

    /**
     * @var Weekdays
     *
     * @ORM\OneToOne(targetEntity="Weekdays", cascade={"all"})
     * @ORM\JoinColumn(name="weekdays_id", referencedColumnName="id")
     */
    private $weekdays;


    /**
     * Constructor
     *
     */
    public function __construct()
    {
        $this->periodCollection = new ArrayCollection;
        return parent::__construct();
    }

    /**
     * Get PeriodCollection
     *
     * @return ArrayCollection
     */
    public function getPeriodCollection()
    {
        return $this->periodCollection;
    }

    /**
     * Set PeriodCollection
     *
     * @param ArrayCollection $periodCollection
     *
     * @return self
     */
    public function setPeriodCollection(ArrayCollection $periodCollection)
    {
        $this->periodCollection = $periodCollection;
        return $this;
    }

    /**
     * Add period in collection
     *
     * @param Period $period
     *
     * @return self
     */
    public function addPeriod(Period $period)
    {
        $this->periodCollection[] = $period;
        return $this;
    }

    /**
     * Gets the value of month.
     *
     * @return string
     */
    public function getMonth()
    {
        return $this->month;
    }

    /**
     * Sets the value of month.
     *
     * @param string $month the month
     *
     * @return self
     */
    public function setMonth($month)
    {
        $this->month = $month;

        return $this;
    }

    /**
     * Gets the value of monthday.
     *
     * @return Monthday
     */
    public function getMonthday()
    {
        return $this->monthday;
    }

    /**
     * Sets the value of monthday.
     *
     * @param Monthday $monthday the monthday
     *
     * @return self
     */
    public function setMonthday(Monthday $monthday)
    {
        $this->monthday = $monthday;

        return $this;
    }

    /**
     * Gets the value of ultimos.
     *
     * @return Ultimos
     */
    public function getUltimos()
    {
        return $this->ultimos;
    }

    /**
     * Sets the value of ultimos.
     *
     * @param Ultimos $ultimos the ultimos
     *
     * @return self
     */
    public function setUltimos(Ultimos $ultimos)
    {
        $this->ultimos = $ultimos;

        return $this;
    }

    /**
     * Gets the value of weekdays.
     *
     * @return Weekdays
     */
    public function getWeekdays()
    {
        return $this->weekdays;
    }

    /**
     * Sets the value of weekdays.
     *
     * @param Weekdays $weekdays the weekdays
     *
     * @return self
     */
    public function setWeekdays(Weekdays $weekdays)
    {
        $this->weekdays = $weekdays;

        return $this;
    }
}
