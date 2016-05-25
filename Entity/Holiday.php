<?php
/**
 * Holiday Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Holiday
 *
 * @ORM\Table(name="JOE_HOLIDAY")
 * @ORM\Entity
 */
class Holiday extends AbstractEntity
{

    /**
     * @var DateTime
     *
     * @ORM\Column(name="date", type="string")
     */
    protected $date;

    /**
     * Gets the value of date.
     *
     * @return string
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Sets the value of date.
     *
     * @param string $date the date
     *
     * @return self
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }
}
