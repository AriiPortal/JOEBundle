<?php
/**
 * Monitor Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Monitor
 *
 * @ORM\Table(name="JOE_MONITOR")
 * @ORM\Entity
 */
class Monitor extends AbstractEntity
{

    /**
     * @var string
     *
     * @Assert\NotBlank()
     * @Assert\Length(max=255)
     * @ORM\Column(name="name", type="string", length=255, nullable=true)
     */
    protected $name;

    /**
     * @var integer
     *
     * @Assert\NotBlank()
     * @Assert\Length(max=255)
     * @ORM\Column(name="ordering", type="integer", length=255, nullable=true)
     */
    protected $ordering;

    /**
     * @var Script
     *
     * @ORM\OneToOne(targetEntity="Script", cascade={"all"})
     * @ORM\JoinColumn(name="script_id", referencedColumnName="id")
     */
    protected $script;

    /**
     * Constructor
     *
     */
    public function __construct()
    {
        $this->includes = new ArrayCollection;
        return parent::__construct();
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
     * Gets the value of ordering.
     *
     * @return integer
     */
    public function getOrdering()
    {
        return $this->ordering;
    }

    /**
     * Sets the value of ordering.
     *
     * @param integer $ordering the ordering
     *
     * @return self
     */
    public function setOrdering($ordering)
    {
        $this->ordering = $ordering;

        return $this;
    }

    /**
     * Gets the value of script.
     *
     * @return Script
     */
    public function getScript()
    {
        return $this->script;
    }

    /**
     * Sets the value of script.
     *
     * @param Script $script the script
     *
     * @return self
     */
    public function setScript(Script $script)
    {
        $this->script = $script;

        return $this;
    }
}
