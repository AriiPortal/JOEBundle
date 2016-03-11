<?php
/**
 * Lock Use Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Lock Use
 *
 * @ORM\Table(name="JOE_JOB_LOCK_USE")
 * @ORM\Entity
 */
class LockUse extends AbstractEntity
{
    /**
     * @var Arii\JOEBundle\Entity\Job
     *
     * @ORM\ManyToOne(targetEntity="Job", cascade={"all"})
     * @ORM\JoinColumn(name="job_id", referencedColumnName="id")
     */
    protected $job;

    /**
     * @var string
     *
     * @Assert\NotBlank()
     * @Assert\Length(max=255)
     * @ORM\Column(name="lock_use_lock", type="string", length=255, nullable=true)
     */
    protected $lock;

    /**
     * @var boolean
     *
     * @ORM\Column(type="boolean")
     */
    protected $exclusive = true;

    /**
     * Gets the value of job.
     *
     * @return Arii\JOEBundle\Entity\Job
     */
    public function getJob()
    {
        return $this->job;
    }

    /**
     * Sets the value of job.
     *
     * @param Arii\JOEBundle\Entity\Job $job the job
     *
     * @return self
     */
    public function setJob(Job $job)
    {
        $this->job = $job;

        return $this;
    }

    /**
     * Gets the value of lock.
     *
     * @return string
     */
    public function getLock()
    {
        return $this->lock;
    }

    /**
     * Sets the value of lock.
     *
     * @param string $lock the lock
     *
     * @return self
     */
    public function setLock($lock)
    {
        $this->lock = $lock;

        return $this;
    }

    /**
     * Gets the value of exclusive.
     *
     * @return boolean
     */
    public function getExclusive()
    {
        return $this->exclusive;
    }

    /**
     * Sets the value of exclusive.
     *
     * @param boolean $exclusive the exclusive
     *
     * @return self
     */
    public function setExclusive($exclusive)
    {
        $this->exclusive = $exclusive;

        return $this;
    }
}
