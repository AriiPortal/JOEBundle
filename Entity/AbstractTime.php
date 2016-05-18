<?php
/**
 * Abstract Time Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use BFolliot\Date\DateInterval;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * AbstractTime
 *
 */
abstract class AbstractTime extends AbstractEntity
{

    /**
     * @var string
     *
     * @ORM\Column(name="begin", type="string", nullable=true)
     */
    protected $begin;

    /**
     * @var string
     *
     * @ORM\Column(name="end", type="string", nullable=true)
     */
    protected $end;

    /**
     * @var boolean
     *
     * @ORM\Column(name="let_run", type="boolean")
     */
    protected $letRun = false;

    /**
     * @var string
     *
     * @ORM\Column(name="single_start", type="string", nullable=true)
     */
    protected $singleStart;

    /**
     * @var string
     *
     * @ORM\Column(name="when_holiday", type="string", length=255, nullable=true)
     */
    protected $whenHoliday;

    /**
     * @var string
     *
     * @ORM\Column(name="interval_repeat", type="string", nullable=true)
     */
    protected $repeat;

    /**
     * Set begin
     *
     * @param string $begin
     *
     * @return RunTime
     */
    public function setBegin($begin)
    {
        $this->begin = $begin;

        return $this;
    }

    /**
     * Get begin
     *
     * @return string
     */
    public function getBegin()
    {
        return $this->begin;
    }

    /**
     * Set end
     *
     * @param string $end
     *
     * @return RunTime
     */
    public function setEnd($end)
    {
        $this->end = $end;

        return $this;
    }

    /**
     * Get end
     *
     * @return string
     */
    public function getEnd()
    {
        return $this->end;
    }

    /**
     * Set letRun
     *
     * @param boolean $letRun
     *
     * @return RunTime
     */
    public function setLetRun($letRun)
    {
        $this->letRun = $letRun;

        return $this;
    }

    /**
     * Get letRun
     *
     * @return boolean
     */
    public function getLetRun()
    {
        return $this->letRun;
    }

    /**
     * Set singleStart
     *
     * @param string $singleStart
     *
     * @return RunTime
     */
    public function setSingleStart($singleStart)
    {
        $this->singleStart = $singleStart;

        return $this;
    }

    /**
     * Get singleStart
     *
     * @return string
     */
    public function getSingleStart()
    {
        return $this->singleStart;
    }

    /**
     * Set whenHoliday
     *
     * @param string $whenHoliday
     *
     * @return RunTime
     */
    public function setWhenHoliday($whenHoliday)
    {
        $this->whenHoliday = $whenHoliday;

        return $this;
    }

    /**
     * Get whenHoliday
     *
     * @return string
     */
    public function getWhenHoliday()
    {
        return $this->whenHoliday;
    }

    /**
     * Get repeat
     *
     * @return string
     */
    public function getRepeat()
    {
        return $this->repeat;
    }

    /**
     * Set repeat
     *
     * @param string
     */
    public function setRepeat($repeat)
    {
        $this->repeat = $repeat;
        return $this;
    }
}
