<?php
/**
 * ShowJobChain Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * ShowJobChain
 *
 * @ORM\Table(name="JOE_SHOW_JOB_CHAIN")
 * @ORM\Entity
 */
class ShowJobChain extends AbstractEntity
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
     * @ORM\Column(name="max_order_history", type="integer")
     */
    protected $maxOrderHistory;

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
     * Gets the value of maxOrderHistory.
     *
     * @return integer
     */
    public function getMaxOrderHistory()
    {
        return $this->maxOrderHistory;
    }

    /**
     * Sets the value of maxOrderHistory.
     *
     * @param integer $maxOrderHistory the max order history
     *
     * @return self
     */
    public function setMaxOrderHistory($maxOrderHistory)
    {
        $this->maxOrderHistory = $maxOrderHistory;

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
