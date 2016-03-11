<?php
/**
 * JobChainNode Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * JobChainNode
 *
 * @ORM\Table(name="JOE_JOB_CHAIN_NODE")
 * @ORM\Entity
 */
class JobChainNode extends AbstractEntity
{

    /**
     * @var integer
     *
     * @Assert\GreaterThan(value=-1)
     * @ORM\Column(type="integer")
     */
    protected $delay = 0;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(name="error_state", type="string", length=255)
     */
    protected $errorState;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(type="string", length=255)
     */
    protected $job;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(name="next_state", type="string", length=255)
     */
    protected $nextState;

    /**
     * @var string
     *
     * @ORM\Column(name="on_error", type="string", length=7)
     */
    protected $onError;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(type="string", length=255)
     */
    protected $state;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="OnReturnCode", cascade={"all"})
     * @ORM\JoinTable(name="JOE_JOB_CHAIN_NODE_ON_RETURN_CODES",
     *      joinColumns={@ORM\JoinColumn(name="job_chain_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="on_return_codes_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $onReturnCodeCollection;

    /**
     * Constructor
     *
     */
    public function __construct()
    {
        $this->onReturnCodeCollection = new ArrayCollection;
        return parent::__construct();
    }

    /**
     * Gets the value of delay.
     *
     * @return integer
     */
    public function getDelay()
    {
        return $this->delay;
    }

    /**
     * Sets the value of delay.
     *
     * @param integer $delay the delay
     *
     * @return self
     */
    public function setDelay($delay)
    {
        $this->delay = $delay;

        return $this;
    }

    /**
     * Gets the value of errorState.
     *
     * @return string
     */
    public function getErrorState()
    {
        return $this->errorState;
    }

    /**
     * Sets the value of errorState.
     *
     * @param string $errorState the error state
     *
     * @return self
     */
    public function setErrorState($errorState)
    {
        $this->errorState = $errorState;

        return $this;
    }

    /**
     * Gets the value of job.
     *
     * @return string
     */
    public function getJob()
    {
        return $this->job;
    }

    /**
     * Sets the value of job.
     *
     * @param string $job the job
     *
     * @return self
     */
    public function setJob($job)
    {
        $this->job = $job;

        return $this;
    }

    /**
     * Gets the value of nextState.
     *
     * @return string
     */
    public function getNextState()
    {
        return $this->nextState;
    }

    /**
     * Sets the value of nextState.
     *
     * @param string $nextState the next state
     *
     * @return self
     */
    public function setNextState($nextState)
    {
        $this->nextState = $nextState;

        return $this;
    }

    /**
     * Gets the value of onError.
     *
     * @return string
     */
    public function getOnError()
    {
        return $this->onError;
    }

    /**
     * Sets the value of onError.
     *
     * @param string $onError the on error
     *
     * @return self
     */
    public function setOnError($onError)
    {
        $this->onError = $onError;

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
     * Get onReturnCodeCollection
     *
     * @return ArrayCollection
     */
    public function getOnReturnCodeCollection()
    {
        return $this->onReturnCodeCollection;
    }

    /**
     * Set onReturnCodeCollection
     *
     * @param ArrayCollection $onReturnCodeCollection
     *
     * @return self
     */
    public function setOnReturnCodeCollection(
        ArrayCollection $onReturnCodeCollection
    ) {
        $this->onReturnCodeCollection = $onReturnCodeCollection;
        return $this;
    }

    /**
     * Add OnReturnCode in onReturnCodeCollection
     *
     * @param OnReturnCode $onReturnCode
     *
     * @return self
     */
    public function addOnReturnCode(
        OnReturnCode $onReturnCode
    ) {
        $this->onReturnCodeCollection[] = $onReturnCode;
        return $this;
    }
}
