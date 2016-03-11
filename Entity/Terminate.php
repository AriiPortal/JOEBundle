<?php
/**
 * Terminate Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Terminate
 *
 * @ORM\Table(name="JOE_TERMINATE")
 * @ORM\Entity
 */
class Terminate extends AbstractEntity
{

    /**
     * @var boolean
     *
     * @ORM\Column(name="all_schedulers", type="boolean")
     */
    protected $allSchedulers = false;

    /**
     * @var boolean
     *
     * @ORM\Column(type="boolean")
     */
    protected $restart = false;

    /**
     * @var boolean
     *
     * @ORM\Column(name="continue_exclusive_operation", type="boolean")
     */
    protected $continueExclusiveOperation = false;

    /**
     * @var integer
     *
     * @ORM\Column(type="integer")
     */
    protected $timeout;

    /**
     * Gets the value of allSchedulers.
     *
     * @return boolean
     */
    public function getAllSchedulers()
    {
        return $this->allSchedulers;
    }

    /**
     * Sets the value of allSchedulers.
     *
     * @param boolean $allSchedulers the all schedulers
     *
     * @return self
     */
    public function setAllSchedulers($allSchedulers)
    {
        $this->allSchedulers = $allSchedulers;

        return $this;
    }

    /**
     * Gets the value of restart.
     *
     * @return boolean
     */
    public function getRestart()
    {
        return $this->restart;
    }

    /**
     * Sets the value of restart.
     *
     * @param boolean $restart the restart
     *
     * @return self
     */
    public function setRestart($restart)
    {
        $this->restart = $restart;

        return $this;
    }

    /**
     * Gets the value of continueExclusiveOperation.
     *
     * @return boolean
     */
    public function getContinueExclusiveOperation()
    {
        return $this->continueExclusiveOperation;
    }

    /**
     * Sets the value of continueExclusiveOperation.
     *
     * @param boolean $continueExclusiveOperation the continue exclusive operation
     *
     * @return self
     */
    public function setContinueExclusiveOperation($continueExclusiveOperation)
    {
        $this->continueExclusiveOperation = $continueExclusiveOperation;

        return $this;
    }

    /**
     * Gets the value of timeout.
     *
     * @return integer
     */
    public function getTimeout()
    {
        return $this->timeout;
    }

    /**
     * Sets the value of timeout.
     *
     * @param integer $timeout the timeout
     *
     * @return self
     */
    public function setTimeout($timeout)
    {
        $this->timeout = $timeout;

        return $this;
    }
}
