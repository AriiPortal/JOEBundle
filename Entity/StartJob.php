<?php
/**
 * StartJob Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * StartJob
 *
 * @ORM\Table(name="JOE_START_JOB")
 * @ORM\Entity
 */
class StartJob extends At
{

    /**
     * @var integer
     *
     * @ORM\Column(type="integer", nullable=true)
     */
    protected $afterDelay;

    /**
     * @var boolean
     *
     * @ORM\Column(type="boolean", nullable=true)
     */
    protected $forceStart = true;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(type="string", length=255)
     */
    protected $job;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    protected $taskName;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(name="web_service", type="string", length=255, nullable=true)
     */
    protected $webService;

    /**
     * @var Params
     *
     * @ORM\OneToOne(targetEntity="Params", cascade={"all"})
     * @ORM\JoinColumn(name="params_id", referencedColumnName="id")
     */
    protected $params;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="Variable", cascade={"all"})
     * @ORM\JoinTable(name="JOE_START_JOB_VARIABLES",
     *      joinColumns={@ORM\JoinColumn(name="job_id", referencedColumnName="id", onDelete="CASCADE")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="variable_id", referencedColumnName="id", unique=true, onDelete="CASCADE")}
     *      )
     */
    protected $environmentVariables;

    /**
     * Constructor
     *
     */
    public function __construct()
    {
        $this->at                   = new DateTime;
        $this->environmentVariables = new ArrayCollection;
        return parent::__construct();
    }

    /**
     * Gets the value of afterDelay.
     *
     * @return integer
     */
    public function getAfterDelay()
    {
        return $this->afterDelay;
    }

    /**
     * Sets the value of afterDelay.
     *
     * @param integer $afterDelay the afterDelay
     *
     * @return self
     */
    public function setAfterDelay($afterDelay)
    {
        $this->afterDelay = $afterDelay;

        return $this;
    }

    /**
     * Gets the value of forceStart.
     *
     * @return boolean
     */
    public function getForceStart()
    {
        return $this->forceStart;
    }

    /**
     * Sets the value of forceStart.
     *
     * @param boolean $forceStart the forceStart
     *
     * @return self
     */
    public function setForceStart($forceStart)
    {
        $this->forceStart = $forceStart;

        return $this;
    }

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
     * Gets the value of name.
     *
     * @return string
     */
    public function getTaskName()
    {
        return $this->taskName;
    }

    /**
     * Sets the value of taskName.
     *
     * @param string $taskName the taskName
     *
     * @return self
     */
    public function setTaskName($taskName)
    {
        $this->taskName = $taskName;

        return $this;
    }

    /**
     * Gets the value of webService.
     *
     * @return string
     */
    public function getWebService()
    {
        return $this->webService;
    }

    /**
     * Sets the value of webService.
     *
     * @param string $webService the web service
     *
     * @return self
     */
    public function setWebService($webService)
    {
        $this->webService = $webService;

        return $this;
    }

    /**
     * Gets the value of params.
     *
     * @return Params
     */
    public function getParams()
    {
        return $this->params;
    }

    /**
     * Sets the value of params.
     *
     * @param Params $params the params
     *
     * @return self
     */
    public function setParams(Params $params)
    {
        $this->params = $params;

        return $this;
    }



    /**
     * Get environmentVariables
     *
     * @return ArrayCollection
     */
    public function getEnvironmentVariables()
    {
        return $this->environmentVariables;
    }

    /**
     * Set environmentVariables
     *
     * @param ArrayCollection $environmentVariables
     *
     * @return self
     */
    public function setEnvironmentVariables(ArrayCollection $environmentVariables)
    {
        $this->environmentVariables = $environmentVariables;
        return $this;
    }

    /**
     * Add Variable in environmentVariables
     *
     * @param Variable $variable
     *
     * @return self
     */
    public function addVariable(Variable $variable)
    {
        $this->environmentVariables[] = $variable;
        return $this;
    }
}
