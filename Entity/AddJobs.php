<?php
/**
 * AddJobs Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * AddJobs
 *
 * @ORM\Table(name="JOE_ADD_JOBS")
 * @ORM\Entity
 */
class AddJobs extends AbstractEntity
{

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="Job", cascade={"all"})
     * @ORM\JoinTable(name="JOE_ADD_JOBS_JOB",
     *      joinColumns={@ORM\JoinColumn(name="add_jobs_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="job_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $jobCollection;

    /**
     * Constructor
     *
     */
    public function __construct()
    {
        $this->jobCollection      = new ArrayCollection;
        return parent::__construct();
    }

    /**
     * Get jobCollection
     *
     * @return ArrayCollection
     */
    public function getJobCollection()
    {
        return $this->jobCollection;
    }

    /**
     * Set jobCollection
     *
     * @param ArrayCollection $jobCollection
     *
     * @return self
     */
    public function setJobCollection(ArrayCollection $jobCollection)
    {
        $this->jobCollection = $jobCollection;
        return $this;
    }

    /**
     * Add job in jobCollection
     *
     * @param Job $job
     *
     * @return self
     */
    public function addJob(Job $job)
    {
        $this->jobCollection[] = $job;
        return $this;
    }
}
