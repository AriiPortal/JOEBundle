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
     * @ORM\Column(type="integer")
     */
    protected $after;

    /**
     * @var boolean
     *
     * @ORM\Column(type="boolean")
     */
    protected $force = true;

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
     * @ORM\Column(type="string", length=255)
     */
    protected $name;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(name="web_service", type="string", length=255)
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
     *      joinColumns={@ORM\JoinColumn(name="job_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="variable_id", referencedColumnName="id", unique=true)}
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
     * Gets the value of after.
     *
     * @return integer
     */
    public function getAfter()
    {
        return $this->after;
    }

    /**
     * Sets the value of after.
     *
     * @param integer $after the after
     *
     * @return self
     */
    public function setAfter($after)
    {
        $this->after = $after;

        return $this;
    }

    /**
     * Gets the value of force.
     *
     * @return boolean
     */
    public function getForce()
    {
        return $this->force;
    }

    /**
     * Sets the value of force.
     *
     * @param boolean $force the force
     *
     * @return self
     */
    public function setForce($force)
    {
        $this->force = $force;

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
