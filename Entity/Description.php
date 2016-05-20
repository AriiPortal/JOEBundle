<?php
/**
 * Variable Entity
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Description
 *
 * @ORM\Table(name="JOE_DESCRIPTION")
 * @ORM\Entity
 */
class Description extends AbstractEntity
{
    /**
     * @var IncludeFile
     *
     * @ORM\OneToOne(targetEntity="IncludeFile", cascade={"all"})
     * @ORM\JoinColumn(name="include_id", referencedColumnName="id")
     */
    protected $includeFile;

    /**
     * @var string
     *
     * @ORM\Column(type="text", nullable=true)
     */
    protected $content;

    /**
     * Gets the value of include.
     *
     * @return string
     */
    public function getIncludeFile()
    {
        return $this->includeFile;
    }

    /**
     * Sets the value of include.
     *
     * @param string $include the include
     *
     * @return self
     */
    public function setIncludeFile($include)
    {
        $this->includeFile = $include;

        return $this;
    }

    /**
     * Gets the value of content.
     *
     * @return string
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * Sets the value of content.
     *
     * @param string $content the content
     *
     * @return self
     */
    public function setContent($content)
    {
        $this->content = $content;

        return $this;
    }
}
