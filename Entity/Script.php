<?php
/**
 * Script Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Script
 *
 * @ORM\Table(name="JOE_SCRIPT")
 * @ORM\Entity
 */
class Script extends AbstractEntity
{

    /**
     * @var string
     *
     * @Assert\NotBlank()
     * @Assert\Length(max=255)
     * @ORM\Column(name="language", type="string", length=255)
     */
    protected $language;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(name="com_class", type="string", length=255, nullable=true)
     */
    protected $comClass;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(name="filename", type="string", length=255, nullable=true)
     */
    protected $filename;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(name="java_class", type="string", length=255, nullable=true)
     */
    protected $javaClass;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(name="java_class_path", type="string", length=255, nullable=true)
     */
    protected $javaClassPath;

    /**
     * @ORM\ManyToMany(targetEntity="IncludeFile", cascade={"all"})
     * @ORM\JoinTable(name="JOE_SCRIPT_INCLUDES",
     *      joinColumns={@ORM\JoinColumn(name="script_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="include_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $includes;

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
     * Get includes collection
     *
     * @return ArrayCollection
     */
    public function getIncludes()
    {
        return $this->includes;
    }

    /**
     * Set includes collection
     *
     * @param ArrayCollection includes
     *
     * @return self
     */
    public function setIncludes(ArrayCollection $includes)
    {
        $this->includes = $includes;
        return $this;
    }

    /**
     * Add include in includes collection
     *
     * @param IncludeFile $include
     *
     * @return self
     */
    public function addInclude(IncludeFile $include)
    {
        $this->includes[] = $param;
        return $this;
    }

    /**
     * Gets the value of language.
     *
     * @return string
     */
    public function getLanguage()
    {
        return $this->language;
    }

    /**
     * Sets the value of language.
     *
     * @param string $language the language
     *
     * @return self
     */
    public function setLanguage($language)
    {
        $this->language = $language;

        return $this;
    }

    /**
     * Gets the value of comClass.
     *
     * @return string
     */
    public function getComClass()
    {
        return $this->comClass;
    }

    /**
     * Sets the value of comClass.
     *
     * @param string $comClass the com class
     *
     * @return self
     */
    public function setComClass($comClass)
    {
        $this->comClass = $comClass;

        return $this;
    }

    /**
     * Gets the value of filename.
     *
     * @return string
     */
    public function getFilename()
    {
        return $this->filename;
    }

    /**
     * Sets the value of filename.
     *
     * @param string $filename the filename
     *
     * @return self
     */
    public function setFilename($filename)
    {
        $this->filename = $filename;

        return $this;
    }

    /**
     * Gets the value of javaClass.
     *
     * @return string
     */
    public function getJavaClass()
    {
        return $this->javaClass;
    }

    /**
     * Sets the value of javaClass.
     *
     * @param string $javaClass the java class
     *
     * @return self
     */
    public function setJavaClass($javaClass)
    {
        $this->javaClass = $javaClass;

        return $this;
    }

    /**
     * Gets the value of javaClassPath.
     *
     * @return string
     */
    public function getJavaClassPath()
    {
        return $this->javaClassPath;
    }

    /**
     * Sets the value of javaClassPath.
     *
     * @param string $javaClassPath the java class path
     *
     * @return self
     */
    public function setJavaClassPath($javaClassPath)
    {
        $this->javaClassPath = $javaClassPath;

        return $this;
    }
}
