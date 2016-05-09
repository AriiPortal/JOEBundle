<?php
/**
 * DelayAfterError Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * DelayAfterError
 *
 * @ORM\Table(name="JOE_DELAY_AFTER_ERROR")
 * @ORM\Entity
 */
class DelayAfterError extends AbstractEntity
{

    /**
     * @var integer
     *
     * @Assert\NotBlank()
     * @Assert\Length(max=255)
     * @ORM\Column(name="delay_count", type="integer")
     */
    protected $delayCount;

    /**
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $delay;

    /**
     * Gets the value of delayCount.
     *
     * @return integer
     */
    public function getDelayCount()
    {
        return $this->delayCount;
    }

    /**
     * Sets the value of delayCount.
     *
     * @param integer $delayCount the delay count
     *
     * @return self
     */
    public function setDelayCount($delayCount)
    {
        $this->delayCount = $delayCount;

        return $this;
    }

    /**
     * Gets the delay
     *
     * @return string
     */
    public function getDelay()
    {
        return $this->delay;
    }

    /**
     * Sets the delay
     *
     * @param string $delay the delay
     *
     * @return self
     */
    public function setDelay($delay)
    {
        $this->delay = $delay;

        return $this;
    }
}
