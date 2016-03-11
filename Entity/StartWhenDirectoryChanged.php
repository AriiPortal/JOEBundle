<?php
/**
 * StartWhenDirectoryChanged Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * StartWhenDirectoryChanged
 *
 * @ORM\Table(name="JOE_START_WHEN_DIRECTORY_CHANGED")
 * @ORM\Entity
 */
class StartWhenDirectoryChanged extends AbstractEntity
{

    /**
     * @var string
     *
     * @Assert\NotBlank()
     * @Assert\Length(max=255)
     * @ORM\Column(name="directory", type="string", length=255)
     */
    protected $directory;

    /**
     * @var string
     *
     * @Assert\NotBlank()
     * @Assert\Length(max=255)
     * @ORM\Column(name="regex", type="string", length=255)
     */
    protected $regex;

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
     * Gets the value of directory.
     *
     * @return string
     */
    public function getDirectory()
    {
        return $this->directory;
    }

    /**
     * Sets the value of directory.
     *
     * @param string $directory the directory
     *
     * @return self
     */
    public function setDirectory($directory)
    {
        $this->directory = $directory;

        return $this;
    }

    /**
     * Gets the value of regex.
     *
     * @return string
     */
    public function getRegex()
    {
        return $this->regex;
    }

    /**
     * Sets the value of regex.
     *
     * @param string $regex the regex
     *
     * @return self
     */
    public function setRegex($regex)
    {
        $this->regex = $regex;

        return $this;
    }
}
