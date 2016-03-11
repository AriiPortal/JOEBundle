<?php
/**
 * Date Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Date
 *
 * @ORM\Table(name="JOE_RUN_TIME_DATE")
 * @ORM\Entity
 */
class Date extends AbstractEntity
{

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date", type="datetime")
     */
    protected $date;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="Period", cascade={"all"})
     * @ORM\JoinTable(name="JOE_RUN_TIME_DATE_PERIODS",
     *      joinColumns={@ORM\JoinColumn(name="date_id", referencedColumnName="id")},
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
     * Gets the value of date.
     *
     * @return \DateTime
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Sets the value of date.
     *
     * @param \DateTime $date the date
     *
     * @return self
     */
    protected function setDate(\DateTime $date)
    {
        $this->date = $date;

        return $this;
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
}
