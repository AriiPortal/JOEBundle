<?php
/**
 * IncludeFile Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * IncludeFile
 *
 * @ORM\Table(name="JOE_INCLUDE")
 * @ORM\Entity
 */
class IncludeFile extends AbstractEntity
{

    /**
     * @var string
     *
     * @Assert\NotBlank()
     * @Assert\Length(max=255)
     * @ORM\Column(name="file", type="string", length=255, nullable=true)
     */
    protected $file;

    /**
     * @var string
     *
     * @Assert\NotBlank()
     * @Assert\Length(max=255)
     * @ORM\Column(name="liveFile", type="string", length=255, nullable=true)
     */
    protected $liveFile;

    /**
     * @var string
     *
     * @Assert\NotBlank()
     * @Assert\Length(max=255)
     * @ORM\Column(name="node", type="string", length=255, nullable=true)
     */
    protected $node;

    /**
     * Gets the value of file.
     *
     * @return string
     */
    public function getFile()
    {
        return $this->file;
    }

    /**
     * Sets the value of file.
     *
     * @param string $file the file
     *
     * @return self
     */
    public function setFile($file)
    {
        $this->file = $file;

        return $this;
    }

    /**
     * Gets the value of liveFile.
     *
     * @return string
     */
    public function getLiveFile()
    {
        return $this->liveFile;
    }

    /**
     * Sets the value of liveFile.
     *
     * @param string $liveFile the live file
     *
     * @return self
     */
    public function setLiveFile($liveFile)
    {
        $this->liveFile = $liveFile;

        return $this;
    }

    /**
     * Gets the value of node.
     *
     * @return string
     */
    public function getNode()
    {
        return $this->node;
    }

    /**
     * Sets the value of node.
     *
     * @param string $node the node
     *
     * @return self
     */
    public function setNode($node)
    {
        $this->node = $node;

        return $this;
    }
}
