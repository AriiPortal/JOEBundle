<?php
/**
 * Holidays Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Variable
 *
 * @ORM\Table(name="JOE_HOLIDAYS")
 * @ORM\Entity
 */
class Holidays extends AbstractEntity
{

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="Weekdays", cascade={"all"})
     * @ORM\JoinTable(name="JOE_HOLIDAYS_WEEKDAYS",
     *      joinColumns={@ORM\JoinColumn(name="holidays_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="weekdays_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $weekdaysCollection;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="Holiday", cascade={"all"})
     * @ORM\JoinTable(name="JOE_HOLIDAYS_HOLIDAY",
     *      joinColumns={@ORM\JoinColumn(name="holidays_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="holiday_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $holidayCollection;

    /**
     * @ORM\ManyToMany(targetEntity="IncludeFile", cascade={"all"})
     * @ORM\JoinTable(name="JOE_HOLIDAYS_INCLUDES",
     *      joinColumns={@ORM\JoinColumn(name="holidays_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="include_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $includeCollection;

    /**
     * Constructor
     *
     */
    public function __construct()
    {
        $this->weekdaysCollection = new ArrayCollection;
        $this->holidayCollection  = new ArrayCollection;
        $this->includeCollection  = new ArrayCollection;
        return parent::__construct();
    }

    /**
     * Get weekdaysCollection
     *
     * @return ArrayCollection
     */
    public function getWeekdaysCollection()
    {
        return $this->weekdaysCollection;
    }

    /**
     * Set weekdaysCollection
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
     * Add Weekdays in weekdaysCollection
     *
     * @param Weekdays $weekdays
     *
     * @return self
     */
    public function addWeekdays(Weekdays $weekdays)
    {
        $this->weekdaysCollection[] = $weekdays;
        return $this;
    }

    /**
     * Get holidayCollection
     *
     * @return ArrayCollection
     */
    public function getHolidayCollection()
    {
        return $this->holidayCollection;
    }

    /**
     * Set holidayCollection
     *
     * @param ArrayCollection $holidayCollection
     *
     * @return self
     */
    public function setHolidayCollection(ArrayCollection $holidayCollection)
    {
        $this->holidayCollection = $holidayCollection;
        return $this;
    }

    /**
     * Add Holiday in holidayCollection
     *
     * @param Holiday $holiday
     *
     * @return self
     */
    public function addHoliday(Holiday $holiday)
    {
        $this->holidayCollection[] = $holiday;
        return $this;
    }

    /**
     * Get includeCollection
     *
     * @return ArrayCollection
     */
    public function getIncludeCollection()
    {
        return $this->includeCollection;
    }

    /**
     * Set includeCollection
     *
     * @param ArrayCollection $includeCollection
     *
     * @return self
     */
    public function setIncludeCollection(ArrayCollection $includeCollection)
    {
        $this->includeCollection = $includeCollection;
        return $this;
    }

    /**
     * Add IncludeFile in includeCollection
     *
     * @param IncludeFile $include
     *
     * @return self
     */
    public function addInclude(IncludeFile $include)
    {
        $this->includeCollection[] = $include;
        return $this;
    }
}
