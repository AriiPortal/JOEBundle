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
     * @var \DateTime
     *
     * @ORM\Column(name="begin", type="datetime", nullable=true)
     */
    protected $begin;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="end", type="datetime", nullable=true)
     */
    protected $end;

    /**
     * @var boolean
     *
     * @ORM\Column(name="let_run", type="boolean")
     */
    protected $letRun = false;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="single_start", type="datetime", nullable=true)
     */
    protected $singleStart;

    /**
     * @var string
     *
     * @ORM\Column(name="when_holiday", type="string", length=255, nullable=true)
     */
    protected $whenHoliday;

    /**
     * @var DateInterval
     *
     * TODO: https://github.com/doctrine/dbal/blob/master/lib/Doctrine/DBAL/Types/DateIntervalType.php
     *
     * @ORM\Column(name="interval_repeat", type="string", nullable=true)
     */
    protected $repeat;

    /**
     * Set begin
     *
     * @param \DateTime $begin
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
     * @return \DateTime
     */
    public function getBegin()
    {
        return $this->begin;
    }

    /**
     * Set end
     *
     * @param \DateTime $end
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
     * @return \DateTime
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
     * @param \DateTime $singleStart
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
     * @return \DateTime
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
     * TODO: https://github.com/doctrine/dbal/blob/master/lib/Doctrine/DBAL/Types/DateIntervalType.php
     *
     * @return \BFolliot\Date\DateInterval
     */
    public function getRepeat()
    {
        if (empty($this->repeat)) {
            return null;
        }
        return new DateInterval($this->repeat);
    }

    /**
     * Set repeat
     *
     * TODO: https://github.com/doctrine/dbal/blob/master/lib/Doctrine/DBAL/Types/DateIntervalType.php
     *
     * @param \BFolliot\Date\DateInterval repeat
     */
    public function setRepeat(DateInterval $repeat)
    {
        $this->repeat = $repeat->toSpec();
        return $this;
    }
}
