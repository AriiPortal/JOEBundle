<?php
/**
 * CopyParams Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * CopyParams
 *
 * @ORM\Table(name="JOE_COPY_PARAMS")
 * @ORM\Entity
 */
class CopyParams extends AbstractEntity
{

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(type="string", length=255)
     */
    protected $fromSource;

    /**
     * Gets the value of from.
     *
     * @return string
     */
    public function getFromSource()
    {
        return $this->fromSource;
    }

    /**
     * Sets the value of from.
     *
     * @param string $from the from
     *
     * @return self
     */
    public function setFromSource($fromSource)
    {
        $this->fromSource = $fromSource;

        return $this;
    }
}
