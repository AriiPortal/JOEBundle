<?php
/**
 * RemoteScheduler Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * RemoteScheduler
 *
 * @ORM\Table(name="JOE_REMOTE_SCHEDULER")
 * @ORM\Entity
 */
class RemoteScheduler extends AbstractEntity
{


    /**
     * @var integer
     *
     * @ORM\Column(name="http_heartbeat_period", type="integer")
     */
    protected $httpHeartbeatPeriod = 10;

    /**
     * @var integer
     *
     * @ORM\Column(name="http_heartbeat_timeout", type="integer")
     */
    protected $httpHeartbeatTimeout = 15;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(name="remote_scheduler", type="string", length=255)
     */
    protected $remoteScheduler;

    /**
     * Gets the value of httpHeartbeatPeriod.
     *
     * @return integer
     */
    public function getHttpHeartbeatPeriod()
    {
        return $this->httpHeartbeatPeriod;
    }

    /**
     * Sets the value of httpHeartbeatPeriod.
     *
     * @param integer $httpHeartbeatPeriod the http heartbeat period
     *
     * @return self
     */
    public function setHttpHeartbeatPeriod($httpHeartbeatPeriod)
    {
        $this->httpHeartbeatPeriod = $httpHeartbeatPeriod;

        return $this;
    }

    /**
     * Gets the value of httpHeartbeatTimeout.
     *
     * @return integer
     */
    public function getHttpHeartbeatTimeout()
    {
        return $this->httpHeartbeatTimeout;
    }

    /**
     * Sets the value of httpHeartbeatTimeout.
     *
     * @param integer $httpHeartbeatTimeout the http heartbeat timeout
     *
     * @return self
     */
    public function setHttpHeartbeatTimeout($httpHeartbeatTimeout)
    {
        $this->httpHeartbeatTimeout = $httpHeartbeatTimeout;

        return $this;
    }

    /**
     * Gets the value of remoteScheduler.
     *
     * @return string
     */
    public function getRemoteScheduler()
    {
        return $this->remoteScheduler;
    }

    /**
     * Sets the value of remoteScheduler.
     *
     * @param string $remoteScheduler the remote scheduler
     *
     * @return self
     */
    public function setRemoteScheduler($remoteScheduler)
    {
        $this->remoteScheduler = $remoteScheduler;

        return $this;
    }
}
