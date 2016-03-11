<?php
/**
 * ShowHistory Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * ShowHistory
 *
 * @ORM\Table(name="JOE_SHOW_HISTORY")
 * @ORM\Entity
 */
class ShowHistory extends AbstractEntity
{

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(type="string", length=255)
     */
    protected $job;

    /**
     * @var integer
     *
     * @ORM\Column(type="integer")
     */
    protected $next;

    /**
     * @var integer
     *
     * @ORM\Column(type="integer")
     */
    protected $prev;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(type="string", length=255)
     */
    protected $what;

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
     * Gets the value of next.
     *
     * @return integer
     */
    public function getNext()
    {
        return $this->next;
    }

    /**
     * Sets the value of next.
     *
     * @param integer $next the next
     *
     * @return self
     */
    public function setNext($next)
    {
        $this->next = $next;

        return $this;
    }

    /**
     * Gets the value of prev.
     *
     * @return integer
     */
    public function getPrev()
    {
        return $this->prev;
    }

    /**
     * Sets the value of prev.
     *
     * @param integer $prev the prev
     *
     * @return self
     */
    public function setPrev($prev)
    {
        $this->prev = $prev;

        return $this;
    }

    /**
     * Gets the value of what.
     *
     * @return string
     */
    public function getWhat()
    {
        return $this->what;
    }

    /**
     * Sets the value of what.
     *
     * @param string $what the what
     *
     * @return self
     */
    public function setWhat($what)
    {
        $this->what = $what;

        return $this;
    }
}
