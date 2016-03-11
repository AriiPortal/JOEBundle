<?php
/**
 * ModifyJob Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * ModifyJob
 *
 * @ORM\Table(name="JOE_MODIFY_JOB")
 * @ORM\Entity
 */
class ModifyJob extends AbstractEntity
{

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(name="job", type="string", length=255)
     */
    protected $job;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(name="cmd", type="string", length=255)
     */
    protected $cmd;


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
     * Gets the value of cmd.
     *
     * @return string
     */
    public function getCmd()
    {
        return $this->cmd;
    }

    /**
     * Sets the value of cmd.
     *
     * @param string $cmd the cmd
     *
     * @return self
     */
    public function setCmd($cmd)
    {
        $this->cmd = $cmd;

        return $this;
    }
}
