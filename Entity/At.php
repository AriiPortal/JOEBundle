<?php
/**
 * At Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;

/**
 * At
 *
 * @ORM\Table(name="JOE_RUN_TIME_AT")
 * @ORM\Entity
 */
class At extends AbstractEntity
{

    /**
     * @var string
     *
     * @ORM\Column(name="at", type="string")
     */
    protected $at;

    /**
     * Gets the value of at.
     *
     * @return string
     */
    public function getAt()
    {
        return $this->at;
    }

    /**
     * Sets the value of at.
     *
     * @param string $at the at
     *
     * @return self
     */
    public function setAt($at)
    {
        $this->at = $at;

        return $this;
    }
}
