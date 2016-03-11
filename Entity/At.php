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
     * @var \DateTime
     *
     * @ORM\Column(name="at", type="datetime")
     */
    protected $at;

    /**
     * Gets the value of at.
     *
     * @return \DateTime
     */
    public function getAt()
    {
        return $this->at;
    }

    /**
     * Sets the value of at.
     *
     * @param \DateTime $at the at
     *
     * @return self
     */
    protected function setAt(DateTime $at)
    {
        $this->at = $at;

        return $this;
    }
}
