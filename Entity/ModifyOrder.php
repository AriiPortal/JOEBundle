<?php
/**
 * ModifyOrder Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * ModifyOrder
 *
 * @ORM\Table(name="JOE_MODIFY_ORDER")
 * @ORM\Entity
 */
class ModifyOrder extends At
{

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(name="action", type="string", length=255)
     */
    protected $action;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(name="end_state", type="string", length=255)
     */
    protected $endState;

    /**
     * @var integer
     *
     * @ORM\Column(name="order_id", type="integer")
     */
    protected $orderId;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(name="job_chain", type="string", length=255)
     */
    protected $jobChain;

    /**
     * @var integer
     *
     * @ORM\Column(name="priority", type="integer")
     */
    protected $priority;

    /**
     * @var boolean
     *
     * @ORM\Column(name="setback", type="boolean")
     */
    protected $setback;

    /**
     * @var boolean
     *
     * @ORM\Column(name="suspended", type="boolean")
     */
    protected $suspended;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(name="state", type="string", length=255)
     */
    protected $state;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(name="title", type="string", length=255)
     */
    protected $title;

    /**
     * @var Params
     *
     * @ORM\OneToOne(targetEntity="Params", cascade={"all"})
     * @ORM\JoinColumn(name="params_id", referencedColumnName="id")
     */
    protected $params;

    /**
     * @var RunTime
     *
     * @ORM\OneToOne(targetEntity="RunTime", cascade={"all"})
     * @ORM\JoinColumn(name="run_time_id", referencedColumnName="id")
     */
    protected $runTime;

    /**
     * Constructor
     *
     */
    public function __construct()
    {
        return parent::__construct();
    }

    /**
     * Gets the value of action.
     *
     * @return string
     */
    public function getAction()
    {
        return $this->action;
    }

    /**
     * Sets the value of action.
     *
     * @param string $action the action
     *
     * @return self
     */
    public function setAction($action)
    {
        $this->action = $action;

        return $this;
    }

    /**
     * Gets the value of endState.
     *
     * @return string
     */
    public function getEndState()
    {
        return $this->endState;
    }

    /**
     * Sets the value of endState.
     *
     * @param string $endState the end state
     *
     * @return self
     */
    public function setEndState($endState)
    {
        $this->endState = $endState;

        return $this;
    }

    /**
     * Gets the value of orderId.
     *
     * @return integer
     */
    public function getOrderId()
    {
        return $this->orderId;
    }

    /**
     * Sets the value of orderId.
     *
     * @param integer $orderId the order id
     *
     * @return self
     */
    public function setOrderId($orderId)
    {
        $this->orderId = $orderId;

        return $this;
    }

    /**
     * Gets the value of jobChain.
     *
     * @return string
     */
    public function getJobChain()
    {
        return $this->jobChain;
    }

    /**
     * Sets the value of jobChain.
     *
     * @param string $jobChain the job chain
     *
     * @return self
     */
    public function setJobChain($jobChain)
    {
        $this->jobChain = $jobChain;

        return $this;
    }

    /**
     * Gets the value of priority.
     *
     * @return integer
     */
    public function getPriority()
    {
        return $this->priority;
    }

    /**
     * Sets the value of priority.
     *
     * @param integer $priority the priority
     *
     * @return self
     */
    public function setPriority($priority)
    {
        $this->priority = $priority;

        return $this;
    }

    /**
     * Gets the value of setback.
     *
     * @return boolean
     */
    public function getSetback()
    {
        return $this->setback;
    }

    /**
     * Sets the value of setback.
     *
     * @param boolean $setback the setback
     *
     * @return self
     */
    public function setSetback($setback)
    {
        $this->setback = $setback;

        return $this;
    }

    /**
     * Gets the value of suspended.
     *
     * @return boolean
     */
    public function getSuspended()
    {
        return $this->suspended;
    }

    /**
     * Sets the value of suspended.
     *
     * @param boolean $suspended the suspended
     *
     * @return self
     */
    public function setSuspended($suspended)
    {
        $this->suspended = $suspended;

        return $this;
    }

    /**
     * Gets the value of state.
     *
     * @return string
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * Sets the value of state.
     *
     * @param string $state the state
     *
     * @return self
     */
    public function setState($state)
    {
        $this->state = $state;

        return $this;
    }

    /**
     * Gets the value of title.
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Sets the value of title.
     *
     * @param string $title the title
     *
     * @return self
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Gets the value of params.
     *
     * @return Params
     */
    public function getParams()
    {
        return $this->params;
    }

    /**
     * Sets the value of params.
     *
     * @param Params $params the params
     *
     * @return self
     */
    public function setParams(Params $params)
    {
        $this->params = $params;

        return $this;
    }

    /**
     * Gets the value of runTime.
     *
     * @return RunTime
     */
    public function getRunTime()
    {
        return $this->runTime;
    }

    /**
     * Sets the value of runTime.
     *
     * @param RunTime $runTime the run time
     *
     * @return self
     */
    public function setRunTime(RunTime $runTime)
    {
        $this->runTime = $runTime;

        return $this;
    }
}
