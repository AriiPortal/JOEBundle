<?php
/**
 * Schedule Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Schedules
 *
 * @ORM\Table(name="JOE_SCHEDULE")
 * @ORM\Entity
 */
class Schedule extends AbstractEntity
{
    /**
     * @var JobScheduler
     *
     * @ORM\ManyToOne(targetEntity="JobScheduler")
     * @ORM\JoinColumn(name="job_scheduler_id", referencedColumnName="id")
     */
    protected $jobScheduler;

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
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    protected $substitute;

    /**
     * @var string
     *
     * @ORM\Column(name="valid_from", type="string", nullable=true))
     */
    protected $validFrom;

    /**
     * @var string
     *
     * @ORM\Column(name="valid_to", type="string", nullable=true))
     */
    protected $validTo;

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
     * Gets the value of substitute.
     *
     * @return string
     */
    public function getSubstitute()
    {
        return $this->substitute;
    }

    /**
     * Sets the value of substitute.
     *
     * @param string $substitute the substitute
     *
     * @return self
     */
    public function setSubstitute($substitute)
    {
        $this->substitute = $substitute;

        return $this;
    }

    /**
     * Gets the value of validFrom.
     *
     * @return string
     */
    public function getValidFrom()
    {
        return $this->validFrom;
    }

    /**
     * Sets the value of validFrom.
     *
     * @param string $validFrom the valid from
     *
     * @return self
     */
    public function setValidFrom($validFrom)
    {
        $this->validFrom = $validFrom;

        return $this;
    }

    /**
     * Gets the value of validTo.
     *
     * @return string
     */
    public function getValidTo()
    {
        return $this->validTo;
    }

    /**
     * Sets the value of validTo.
     *
     * @param string $validTo the valid to
     *
     * @return self
     */
    public function setValidTo($validTo)
    {
        $this->validTo = $validTo;

        return $this;
    }
}
