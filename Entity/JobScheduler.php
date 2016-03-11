<?php
/**
 * Job Scheduler Entity.
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * JobScheduler
 *
 * @ORM\Table(name="JOE_JOB_SCHEDULER")
 * @UniqueEntity(fields={"name"})
 * @ORM\Entity
 */
class JobScheduler extends AbstractEntity
{

    /**
     * @var string
     *
     * @Assert\NotBlank()
     * @Assert\Length(max=255)
     * @ORM\Column(name="name", type="string", length=255, unique=true)
     */
    protected $name;

    /**
     * @var boolean
     *
     * @ORM\Column(name="ignore_process_classes", type="boolean")
     */
    protected $ignoreProcessClasses = false;

    /**
     * Constructor
     *
     * @param string $name optional name.
     */
    public function __construct($name = null)
    {
        $this->name = $name;
        return parent::__construct();
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set name
     *
     * @param string name
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * Gets the value of ignoreProcessClasses.
     *
     * @return boolean
     */
    public function getIgnoreProcessClasses()
    {
        return $this->ignoreProcessClasses;
    }

    /**
     * Sets the value of ignoreProcessClasses.
     *
     * @param boolean $ignoreProcessClasses the ignore process classes
     *
     * @return self
     */
    public function setIgnoreProcessClasses($ignoreProcessClasses)
    {
        $this->ignoreProcessClasses = $ignoreProcessClasses;

        return $this;
    }
}
