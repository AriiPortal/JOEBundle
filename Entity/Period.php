<?php
/**
 * Period Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use BFolliot\Date\DateInterval;
use Doctrine\ORM\Mapping as ORM;

/**
 * Period
 *
 * @ORM\Table(name="JOE_RUN_TIME_PERIOD")
 * @ORM\Entity
 */
class Period extends AbstractTime
{

    /**
     * @var string
     *
     * @ORM\Column(name="absolute_repeat", type="string", length=255, nullable=true)
     */
    private $absoluteRepeat;

    /**
     * Set absoluteRepeat
     *
     * @param string $absoluteRepeat
     *
     * @return Period
     */
    public function setAbsoluteRepeat($absoluteRepeat)
    {
        $this->absoluteRepeat = $absoluteRepeat;

        return $this;
    }

    /**
     * Get absoluteRepeat
     *
     * @return string
     */
    public function getAbsoluteRepeat()
    {
        return $this->absoluteRepeat;
    }
}
