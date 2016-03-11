<?php
/**
 * Abstract Event.
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Event;

use Symfony\Component\EventDispatcher\Event;
use Aura\Payload_Interface\PayloadInterface;
use Aura\Payload_Interface\PayloadStatus;

abstract class AbstractEvent extends Event
{
    /**
     * @var PayloadInterface
     */
    protected $payload;

    public function __construct(PayloadInterface $payload)
    {
        $this->payload = $payload;
    }

    /**
     * Gets the value of payload.
     *
     * @return PayloadInterface
     */
    public function getPayload()
    {
        return $this->payload;
    }

    /**
     * Sets the value of payload.
     *
     * @param PayloadInterface $payload the payload
     *
     * @return self
     */
    public function setPayload(PayloadInterface $payload)
    {
        $this->payload = $payload;

        return $this;
    }

    /**
     * Get Payload input
     *
     * @return mixed
     */
    public function getInput()
    {
        return $this->payload->getInput();
    }

    /**
     * Get Payload Output
     *
     * @return mixed
     */
    public function getOutput()
    {
        return $this->payload->getOutput();
    }

    /**
     * Set Payload Output
     *
     * @param mixed output
     *
     * @return mixed
     */
    public function setOutput($output)
    {
        $this->payload->setOutput($output);
        return $this;
    }

    /**
     * Get Payload Status
     *
     * @return PayloadStatus
     */
    public function getStatus()
    {
        return $this->payload->getStatus();
    }

    /**
     * Set Payload Status
     *
     * @param status
     *
     * @return self
     */
    public function setStatus($status)
    {
        $this->payload->setStatus($status);
        return $this;
    }
}
