<?php
/**
 * JobChainNodeJobChain Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * JobChainNodeJobChain
 *
 * @ORM\Table(name="JOE_JOB_CHAIN_NODE_JOB_CHAIN")
 * @ORM\Entity
 */
class JobChainNodeJobChain extends AbstractEntity
{


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
     * @ORM\Column(name="job_chain", type="string", length=255)
     */
    protected $jobChain;

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
     * @Assert\Length(max=255)
     * @ORM\Column(type="string", length=255)
     */
    protected $state;


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
}
