<?php
/**
 * ShowJobs Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * ShowJobs
 *
 * @ORM\Table(name="JOE_SHOW_JOBS")
 * @ORM\Entity
 */
class ShowJobs extends AbstractEntity
{
    /**
     * @var integer
     *
     * @ORM\Column(name="max_orders", type="integer")
     */
    protected $maxOrders;

    /**
     * @var integer
     *
     * @ORM\Column(name="max_task_history", type="integer")
     */
    protected $maxTaskHistory;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(type="string", length=255)
     */
    protected $what;

    /**
     * Gets the value of maxOrders.
     *
     * @return integer
     */
    public function getMaxOrders()
    {
        return $this->maxOrders;
    }

    /**
     * Sets the value of maxOrders.
     *
     * @param integer $maxOrders the max orders
     *
     * @return self
     */
    public function setMaxOrders($maxOrders)
    {
        $this->maxOrders = $maxOrders;

        return $this;
    }

    /**
     * Gets the value of maxTaskHistory.
     *
     * @return integer
     */
    public function getMaxTaskHistory()
    {
        return $this->maxTaskHistory;
    }

    /**
     * Sets the value of maxTaskHistory.
     *
     * @param integer $maxTaskHistory the max task history
     *
     * @return self
     */
    public function setMaxTaskHistory($maxTaskHistory)
    {
        $this->maxTaskHistory = $maxTaskHistory;

        return $this;
    }

    /**
     * Gets the value of what.
     *
     * @return string
     */
    public function getWhat()
    {
        return $this->what;
    }

    /**
     * Sets the value of what.
     *
     * @param string $what the what
     *
     * @return self
     */
    public function setWhat($what)
    {
        $this->what = $what;

        return $this;
    }
}
