<?php
/**
 * ProcessClass Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * ProcessClass
 *
 * @ORM\Table(name="JOE_PROCESS_CLASS")
 * @ORM\Entity
 */
class ProcessClass extends AbstractEntity
{
    /**
     * @var Arii\JOEBundle\Entity\JobScheduler
     *
     * @ORM\ManyToOne(targetEntity="JobScheduler")
     * @ORM\JoinColumn(name="job_scheduler_id", referencedColumnName="id")
     */
    protected $jobScheduler;

    /**
     * @var integer
     *
     * @ORM\Column(name="max_processes", type="integer")
     */
    protected $maxProcesses = 30;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(type="string", length=255)
     */
    protected $name;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(name="remote_scheduler", type="string", length=255)
     */
    protected $remoteScheduler;

    /**
     * @var boolean
     *
     * @ORM\Column(type="boolean")
     */
    protected $replace = true;

    /**
     * @var integer
     *
     * @ORM\Column(name="spooler_id", type="integer")
     */
    protected $spoolerId;

    /**
     * @var boolean
     *
     * @ORM\Column(name="ignore_remote_schedulers", type="boolean")
     */
    protected $ignoreRemoteSchedulers = false;


    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="RemoteScheduler", cascade={"all"})
     * @ORM\JoinTable(name="JOE_PROCESS_CLASS_REMOTE_SCHEDULER",
     *      joinColumns={@ORM\JoinColumn(name="process_class_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="remote_scheduler_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $remoteSchedulerCollection;

    /**
     * Constructor
     *
     */
    public function __construct()
    {
        $this->remoteSchedulerCollection = new ArrayCollection;
        return parent::__construct();
    }

    /**
     * Gets the value of jobScheduler.
     *
     * @return Arii\JOEBundle\Entity\JobScheduler
     */
    public function getJobScheduler()
    {
        return $this->jobScheduler;
    }

    /**
     * Sets the value of jobScheduler.
     *
     * @param Arii\JOEBundle\Entity\JobScheduler $jobScheduler the job scheduler
     *
     * @return self
     */
    public function setJobScheduler(Arii\JOEBundle\Entity\JobScheduler $jobScheduler)
    {
        $this->jobScheduler = $jobScheduler;

        return $this;
    }

    /**
     * Gets the value of maxProcesses.
     *
     * @return integer
     */
    public function getMaxProcesses()
    {
        return $this->maxProcesses;
    }

    /**
     * Sets the value of maxProcesses.
     *
     * @param integer $maxProcesses the max processes
     *
     * @return self
     */
    public function setMaxProcesses($maxProcesses)
    {
        $this->maxProcesses = $maxProcesses;

        return $this;
    }

    /**
     * Gets the value of name.
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Sets the value of name.
     *
     * @param string $name the name
     *
     * @return self
     */
    public function setName($name)
    {
        $this->name = $name;

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

    /**
     * Gets the value of replace.
     *
     * @return boolean
     */
    public function getReplace()
    {
        return $this->replace;
    }

    /**
     * Sets the value of replace.
     *
     * @param boolean $replace the replace
     *
     * @return self
     */
    public function setReplace($replace)
    {
        $this->replace = $replace;

        return $this;
    }

    /**
     * Gets the value of spoolerId.
     *
     * @return integer
     */
    public function getSpoolerId()
    {
        return $this->spoolerId;
    }

    /**
     * Sets the value of spoolerId.
     *
     * @param integer $spoolerId the spooler id
     *
     * @return self
     */
    public function setSpoolerId($spoolerId)
    {
        $this->spoolerId = $spoolerId;

        return $this;
    }

    /**
     * Gets the value of ignoreRemoteSchedulers.
     *
     * @return boolean
     */
    public function getIgnoreRemoteSchedulers()
    {
        return $this->ignoreRemoteSchedulers;
    }

    /**
     * Sets the value of ignoreRemoteSchedulers.
     *
     * @param boolean $ignoreRemoteSchedulers the ignore remote schedulers
     *
     * @return self
     */
    public function setIgnoreRemoteSchedulers($ignoreRemoteSchedulers)
    {
        $this->ignoreRemoteSchedulers = $ignoreRemoteSchedulers;

        return $this;
    }


    /**
     * Get remoteSchedulerCollection
     *
     * @return ArrayCollection
     */
    public function getRemoteSchedulerCollection()
    {
        return $this->remoteSchedulerCollection;
    }

    /**
     * Set remoteSchedulerCollection
     *
     * @param ArrayCollection $remoteSchedulerCollection
     *
     * @return self
     */
    public function setRemoteSchedulerCollection(
        ArrayCollection $remoteSchedulerCollection
    ) {
        $this->remoteSchedulerCollection = $remoteSchedulerCollection;
        return $this;
    }

    /**
     * Add RemoteScheduler in remoteSchedulerCollection
     *
     * @param RemoteScheduler $remoteScheduler
     *
     * @return self
     */
    public function addRemoteScheduler(
        RemoteScheduler $remoteScheduler
    ) {
        $this->remoteSchedulerCollection[] = $remoteScheduler;
        return $this;
    }
}
