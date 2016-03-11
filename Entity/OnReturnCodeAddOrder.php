<?php
/**
 * OnReturnCodeAddOrder Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * OnReturnCodeAddOrder
 *
 * @ORM\Table(name="JOE_ON_RETURN_CODE_ADD_ORDER")
 * @ORM\Entity
 */
class OnReturnCodeAddOrder extends AbstractEntity
{

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(name="job_chain", type="string", length=255)
     */
    protected $jobChain;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(name="xmlns", type="string", length=255)
     */
    protected $xmlns;

    /**
     * @var Params
     *
     * @ORM\OneToOne(targetEntity="Params", cascade={"all"})
     * @ORM\JoinColumn(name="params_id", referencedColumnName="id")
     */
    protected $params;


    /**
     * Gets the value of jobChain.
     *
     * @return string
     */
    public function getJobChain()
    {
        return $this->jobChain;
    }

    /**
     * Sets the value of jobChain.
     *
     * @param string $jobChain the job chain
     *
     * @return self
     */
    public function setJobChain($jobChain)
    {
        $this->jobChain = $jobChain;

        return $this;
    }

    /**
     * Gets the value of xmlns.
     *
     * @return string
     */
    public function getXmlns()
    {
        return $this->xmlns;
    }

    /**
     * Sets the value of xmlns.
     *
     * @param string $xmlns the xmlns
     *
     * @return self
     */
    public function setXmlns($xmlns)
    {
        $this->xmlns = $xmlns;

        return $this;
    }

    /**
     * Gets the value of params.
     *
     * @return Params
     */
    public function getParams()
    {
        return $this->params;
    }

    /**
     * Sets the value of params.
     *
     * @param Params $params the params
     *
     * @return self
     */
    public function setParams(Params $params)
    {
        $this->params = $params;

        return $this;
    }
}
