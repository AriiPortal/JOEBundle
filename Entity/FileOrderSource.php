<?php
/**
 * FileOrderSource Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * FileOrderSource
 *
 * @ORM\Table(name="JOE_FILE_ORDER_SOURCE")
 * @ORM\Entity
 */
class FileOrderSource extends AbstractEntity
{
    /**
     * @var boolean
     *
     * @ORM\Column(name="alert_when_directory_missing", type="boolean")
     */
    protected $alertWhenDirectoryMissing;

    /**
     * @var integer
     *
     * @Assert\GreaterThan(value=-1)
     * @ORM\Column(name="delay_after_error", type="integer")
     */
    protected $delayAfterError;

    /**
     * @var integer
     *
     * @Assert\GreaterThan(value=-1)
     * @ORM\Column(type="integer")
     */
    protected $repeat = 10;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(type="string", length=255)
     */
    protected $directory;

    /**
     * @var integer
     *
     * @ORM\Column(type="integer")
     */
    protected $max = 100;

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
    protected $regex;

    /**
     * Gets the value of alertWhenDirectoryMissing.
     *
     * @return boolean
     */
    public function getAlertWhenDirectoryMissing()
    {
        return $this->alertWhenDirectoryMissing;
    }

    /**
     * Sets the value of alertWhenDirectoryMissing.
     *
     * @param boolean $alertWhenDirectoryMissing the alert when directory missing
     *
     * @return self
     */
    public function setAlertWhenDirectoryMissing($alertWhenDirectoryMissing)
    {
        $this->alertWhenDirectoryMissing = $alertWhenDirectoryMissing;

        return $this;
    }

    /**
     * Gets the value of delayAfterError.
     *
     * @return integer
     */
    public function getDelayAfterError()
    {
        return $this->delayAfterError;
    }

    /**
     * Sets the value of delayAfterError.
     *
     * @param integer $delayAfterError the delay after error
     *
     * @return self
     */
    public function setDelayAfterError($delayAfterError)
    {
        $this->delayAfterError = $delayAfterError;

        return $this;
    }

    /**
     * Gets the value of repeat.
     *
     * @return integer
     */
    public function getRepeat()
    {
        return $this->repeat;
    }

    /**
     * Sets the value of repeat.
     *
     * @param integer $repeat the repeat
     *
     * @return self
     */
    public function setRepeat($repeat)
    {
        $this->repeat = $repeat;
        if (empty($this->delayAfterError)) {
            $this->delayAfterError = $repeat;
        }
        return $this;
    }

    /**
     * Gets the value of directory.
     *
     * @return string
     */
    public function getDirectory()
    {
        return $this->directory;
    }

    /**
     * Sets the value of directory.
     *
     * @param string $directory the directory
     *
     * @return self
     */
    public function setDirectory($directory)
    {
        $this->directory = $directory;

        return $this;
    }

    /**
     * Gets the value of max.
     *
     * @return integer
     */
    public function getMax()
    {
        return $this->max;
    }

    /**
     * Sets the value of max.
     *
     * @param integer $max the max
     *
     * @return self
     */
    public function setMax($max)
    {
        $this->max = $max;

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
     * Gets the value of regex.
     *
     * @return string
     */
    public function getRegex()
    {
        return $this->regex;
    }

    /**
     * Sets the value of regex.
     *
     * @param string $regex the regex
     *
     * @return self
     */
    public function setRegex($regex)
    {
        $this->regex = $regex;

        return $this;
    }
}
