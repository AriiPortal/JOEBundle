<?php
/**
 * Monitor Use Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Monitor Use
 *
 * @ORM\Table(name="JOE_JOB_MONITOR_USE")
 * @ORM\Entity
 */
class MonitorUse extends AbstractEntity
{
    /**
     * @var string
     *
     * @Assert\NotBlank()
     * @Assert\Length(max=255)
     * @ORM\Column(name="monitor_use_monitor", type="string", length=255, nullable=true)
     */
    protected $monitor;


    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(name="ordering", type="string", length=255, nullable=true)
     */
    protected $ordering;

    /**
     * Gets the value of monitor.
     *
     * @return string
     */
    public function getMonitor()
    {
        return $this->monitor;
    }

    /**
     * Sets the value of monitor.
     *
     * @param string $monitor the monitor
     *
     * @return self
     */
    public function setMonitor($monitor)
    {
        $this->monitor = $monitor;

        return $this;
    }

    /**
     * Gets the value of ordering.
     *
     * @return string
     */
    public function getOrdering()
    {
        return $this->ordering;
    }

    /**
     * Sets the value of ordering.
     *
     * @param string $ordering the ordering
     *
     * @return self
     */
    public function setOrdering($ordering)
    {
        $this->ordering = $ordering;

        return $this;
    }
}
