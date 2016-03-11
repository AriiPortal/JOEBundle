<?php
/**
 * ShowJob Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * ShowJob
 *
 * @ORM\Table(name="JOE_SHOW_JOB")
 * @ORM\Entity
 */
class ShowJob extends AbstractEntity
{

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
     * @ORM\Column(name="job_chain", type="string", length=255)
     */
    protected $jobChain;

    /**
     * @var integer
     *
     * @ORM\Column(name="max_orders", type="integer")
     */
    protected $maxOrders;

    /**
     * @var integer
     *
     * @ORM\Column(name="max_task_history", type="integer")
     */
    protected $maxTaskHistory;

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
     * Gets the value of jobChain.
     *
     * @return string
     */
    public function getJobChain()
    {
        return $this->jobChain;
    }

    /**
     * Sets the value of jobChain.
     *
     * @param string $jobChain the job chain
     *
     * @return self
     */
    public function setJobChain($jobChain)
    {
        $this->jobChain = $jobChain;

        return $this;
    }

    /**
     * Gets the value of maxOrders.
     *
     * @return integer
     */
    public function getMaxOrders()
    {
        return $this->maxOrders;
    }

    /**
     * Sets the value of maxOrders.
     *
     * @param integer $maxOrders the max orders
     *
     * @return self
     */
    public function setMaxOrders($maxOrders)
    {
        $this->maxOrders = $maxOrders;

        return $this;
    }

    /**
     * Gets the value of maxTaskHistory.
     *
     * @return integer
     */
    public function getMaxTaskHistory()
    {
        return $this->maxTaskHistory;
    }

    /**
     * Sets the value of maxTaskHistory.
     *
     * @param integer $maxTaskHistory the max task history
     *
     * @return self
     */
    public function setMaxTaskHistory($maxTaskHistory)
    {
        $this->maxTaskHistory = $maxTaskHistory;

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
