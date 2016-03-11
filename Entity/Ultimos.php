<?php
/**
 * Ultimos Entity
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
 * @ORM\Table(name="JOE_ULTIMOS")
 * @ORM\Entity
 */
class Ultimos extends AbstractEntity
{

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="Day", cascade={"all"})
     * @ORM\JoinTable(name="JOE_ULTIMOS_DAY",
     *      joinColumns={@ORM\JoinColumn(name="ultimatos_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="day_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $dayCollection;

    /**
     * Constructor
     *
     */
    public function __construct()
    {
        $this->dayCollection = new ArrayCollection;
        return parent::__construct();
    }

    /**
     * Get DayCollection
     *
     * @return ArrayCollection
     */
    public function getDayCollection()
    {
        return $this->dayCollection;
    }

    /**
     * Set DayCollection
     *
     * @param ArrayCollection $dayCollection
     *
     * @return self
     */
    public function setDayCollection(ArrayCollection $dayCollection)
    {
        $this->dayCollection = $dayCollection;
        return $this;
    }

    /**
     * Add Day in DayCollection
     *
     * @param Day $day
     *
     * @return self
     */
    public function addDay(Day $day)
    {
        $this->dayCollection[] = $day;
        return $this;
    }
}
