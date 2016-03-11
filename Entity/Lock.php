<?php
/**
 * Lock Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Lock
 *
 * @ORM\Table(name="JOE_LOCK")
 * @ORM\Entity
 */
class Lock extends AbstractEntity
{
    /**
     * @var JobScheduler
     *
     * @ORM\ManyToOne(targetEntity="JobScheduler")
     * @ORM\JoinColumn(name="job_scheduler_id", referencedColumnName="id")
     */
    protected $jobScheduler;

    /**
     * @var integer
     *
     * @ORM\Column(name="max_non_exclusive", type="integer")
     */
    protected $maxNonExclusive;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(type="string", length=255)
     */
    protected $name;


    /**
     * Gets the value of jobScheduler.
     *
     * @return JobScheduler
     */
    public function getJobScheduler()
    {
        return $this->jobScheduler;
    }

    /**
     * Sets the value of jobScheduler.
     *
     * @param JobScheduler $jobScheduler the job scheduler
     *
     * @return self
     */
    public function setJobScheduler(JobScheduler $jobScheduler)
    {
        $this->jobScheduler = $jobScheduler;

        return $this;
    }

    /**
     * Gets the value of maxNonExclusive.
     *
     * @return integer
     */
    public function getMaxNonExclusive()
    {
        return $this->maxNonExclusive;
    }

    /**
     * Sets the value of maxNonExclusive.
     *
     * @param integer $maxNonExclusive the max non exclusive
     *
     * @return self
     */
    public function setMaxNonExclusive($maxNonExclusive)
    {
        $this->maxNonExclusive = $maxNonExclusive;

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
}
