<?php
/**
 * OnReturnCode Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * OnReturnCode
 *
 * @ORM\Table(name="JOE_ON_RETURN_CODE")
 * @ORM\Entity
 */
class OnReturnCode extends AbstractEntity
{

    /**
     * @var integer
     *
     * @ORM\Column(name="return_code", type="integer")
     */
    protected $returnCode;

    /**
     * @var integer
     *
     * @ORM\Column(name="state", type="integer")
     */
    protected $state;

    /**
     * @var OnReturnCodeAddOrder
     *
     * @ORM\OneToOne(targetEntity="OnReturnCodeAddOrder", cascade={"all"})
     * @ORM\JoinColumn(name="on_return_code_add_order_id", referencedColumnName="id")
     */
    protected $onReturnCodeAddOrder;


    /**
     * Gets the value of returnCode.
     *
     * @return integer
     */
    public function getReturnCode()
    {
        return $this->returnCode;
    }

    /**
     * Sets the value of returnCode.
     *
     * @param integer $returnCode the return code
     *
     * @return self
     */
    public function setReturnCode($returnCode)
    {
        $this->returnCode = $returnCode;

        return $this;
    }

    /**
     * Gets the value of state.
     *
     * @return integer
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * Sets the value of state.
     *
     * @param integer $state the state
     *
     * @return self
     */
    public function setState($state)
    {
        $this->state = $state;

        return $this;
    }

    /**
     * Gets the value of onReturnCodeAddOrder.
     *
     * @return OnReturnCodeAddOrder
     */
    public function getOnReturnCodeAddOrder()
    {
        return $this->onReturnCodeAddOrder;
    }

    /**
     * Sets the value of onReturnCodeAddOrder.
     *
     * @param OnReturnCodeAddOrder $onReturnCodeAddOrder the on return code add order
     *
     * @return self
     */
    public function setOnReturnCodeAddOrder(OnReturnCodeAddOrder $onReturnCodeAddOrder)
    {
        $this->onReturnCodeAddOrder = $onReturnCodeAddOrder;

        return $this;
    }
}
