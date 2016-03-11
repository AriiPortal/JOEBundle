<?php
/**
 * DelayOrderAfterSetback Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use BFolliot\Date\DateInterval;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * DelayOrderAfterSetback
 *
 * @ORM\Table(name="JOE_DELAY_ORDER_AFTER_SETBACK")
 * @ORM\Entity
 */
class DelayOrderAfterSetback extends AbstractEntity
{

    /**
     * @var integer
     *
     * @Assert\NotBlank()
     * @ORM\Column(name="setback_count", type="integer")
     */
    protected $setbackCount;

    /**
     * @var boolean
     *
     * @Assert\NotBlank()
     * @ORM\Column(name="is_maximum", type="boolean")
     */
    protected $isMaximum;

    /**
     * @var BFolliot\Date\DateInterval
     *
     * TODO: https://github.com/doctrine/dbal/blob/master/lib/Doctrine/DBAL/Types/DateIntervalType.php
     *
     * @ORM\Column(type="string")
     */
    protected $delay;

    /**
     * Gets the delay
     *
     * TODO: https://github.com/doctrine/dbal/blob/master/lib/Doctrine/DBAL/Types/DateIntervalType.php.
     *
     * @return BFolliot\Date\DateInterval
     */
    public function getDelay()
    {
        return $this->delay;
    }

    /**
     * Sets the delay
     *
     * TODO: https://github.com/doctrine/dbal/blob/master/lib/Doctrine/DBAL/Types/DateIntervalType.php.
     *
     * @param BFolliot\Date\DateInterval $delay the delay
     *
     * @return self
     */
    public function setDelay(DateInterval $delay)
    {
        $this->delay = $delay;

        return $this;
    }

    /**
     * Gets the value of setbackCount.
     *
     * @return integer
     */
    public function getSetbackCount()
    {
        return $this->setbackCount;
    }

    /**
     * Sets the value of setbackCount.
     *
     * @param integer $setbackCount the setback count
     *
     * @return self
     */
    public function setSetbackCount($setbackCount)
    {
        $this->setbackCount = $setbackCount;

        return $this;
    }

    /**
     * Gets the value of isMaximum.
     *
     * @return boolean
     */
    public function getIsMaximum()
    {
        return $this->isMaximum;
    }

    /**
     * Sets the value of isMaximum.
     *
     * @param boolean $isMaximum the is maximum
     *
     * @return self
     */
    public function setIsMaximum($isMaximum)
    {
        $this->isMaximum = $isMaximum;

        return $this;
    }
}
