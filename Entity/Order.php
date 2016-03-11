<?php
/**
 * Order Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Order
 *
 * @ORM\Table(name="JOE_ORDER")
 * @ORM\Entity
 */
class Order extends AbstractEntity
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
     * @ORM\Column(type="integer")
     */
    protected $priority;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(type="string", length=255)
     */
    protected $title;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(type="string", length=255)
     */
    protected $name;

    /**
     * @var Params
     *
     * @ORM\OneToOne(targetEntity="Params", cascade={"all"})
     * @ORM\JoinColumn(name="params_id", referencedColumnName="id")
     */
    protected $params;

    /**
     * @var RunTime
     *
     * @ORM\OneToOne(targetEntity="RunTime", cascade={"all"})
     * @ORM\JoinColumn(name="runtime_id", referencedColumnName="id")
     */
    protected $runTime;

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
     * Gets the value of priority.
     *
     * @return integer
     */
    public function getPriority()
    {
        return $this->priority;
    }

    /**
     * Sets the value of priority.
     *
     * @param integer $priority the priority
     *
     * @return self
     */
    public function setPriority($priority)
    {
        $this->priority = $priority;

        return $this;
    }

    /**
     * Gets the value of title.
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Sets the value of title.
     *
     * @param string $title the title
     *
     * @return self
     */
    public function setTitle($title)
    {
        $this->title = $title;

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
     * Gets the value of runTime.
     *
     * @return RunTime
     */
    public function getRunTime()
    {
        return $this->runTime;
    }

    /**
     * Sets the value of runTime.
     *
     * @param RunTime $runTime the run time
     *
     * @return self
     */
    public function setRunTime(RunTime $runTime)
    {
        $this->runTime = $runTime;

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
