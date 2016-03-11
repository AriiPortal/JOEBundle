<?php
/**
 * ModifySpooler Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * ModifySpooler
 *
 * @ORM\Table(name="JOE_MODIFY_SPOOLER")
 * @ORM\Entity
 */
class ModifySpooler extends AbstractEntity
{

    /**
     * @var integer
     *
     * @ORM\Column(name="timeout", type="integer")
     */
    protected $timeout;

    /**
     * @var string
     *
     * @ORM\Column(name="cmd", type="string")
     */
    protected $cmd;

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

    /**
     * Gets the value of cmd.
     *
     * @return string
     */
    public function getCmd()
    {
        return $this->cmd;
    }

    /**
     * Sets the value of cmd.
     *
     * @param string $cmd the cmd
     *
     * @return self
     */
    public function setCmd($cmd)
    {
        $this->cmd = $cmd;

        return $this;
    }
}
