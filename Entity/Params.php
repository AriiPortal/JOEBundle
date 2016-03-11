<?php
/**
 * Params Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Params
 *
 * @ORM\Table(name="JOE_PARAMS")
 * @ORM\Entity
 */
class Params extends AbstractEntity
{

    /**
     * @ORM\ManyToMany(targetEntity="Param", cascade={"all"})
     * @ORM\JoinTable(name="JOE_PARAMS_PARAM",
     *      joinColumns={@ORM\JoinColumn(name="params_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="param_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $paramCollection;

    /**
     * @ORM\ManyToMany(targetEntity="CopyParams", cascade={"all"})
     * @ORM\JoinTable(name="JOE_PARAMS_COPY_PARAMS",
     *      joinColumns={@ORM\JoinColumn(name="params_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="copy_params_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $copyParamsCollection;

    /**
     * @ORM\ManyToMany(targetEntity="IncludeFile", cascade={"all"})
     * @ORM\JoinTable(name="JOE_PARAMS_INCLUDES",
     *      joinColumns={@ORM\JoinColumn(name="params_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="include_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $includes;

    /**
     * Constructor
     *
     */
    public function __construct()
    {
        $this->paramCollection      = new ArrayCollection;
        $this->includes             = new ArrayCollection;
        $this->copyParamsCollection = new ArrayCollection;
        return parent::__construct();
    }

    /**
     * Get paramCollection
     *
     * @return ArrayCollection
     */
    public function getParamCollection()
    {
        return $this->paramCollection;
    }

    /**
     * Set paramCollection
     *
     * @param ArrayCollection paramCollection
     *
     * @return self
     */
    public function setParamCollection(ArrayCollection $paramCollection)
    {
        $this->paramCollection = $paramCollection;
        return $this;
    }

    /**
     * Add param in paramCollection
     *
     * @param Param $param
     *
     * @return self
     */
    public function addParam(Param $param)
    {
        $this->paramCollection[] = $param;
        return $this;
    }

    /**
     * Get includes collection
     *
     * @return ArrayCollection
     */
    public function getIncludes()
    {
        return $this->includes;
    }

    /**
     * Set includes collection
     *
     * @param ArrayCollection includes
     *
     * @return self
     */
    public function setIncludes(ArrayCollection $includes)
    {
        $this->includes = $includes;
        return $this;
    }

    /**
     * Add include in includes collection
     *
     * @param IncludeFile $include
     *
     * @return self
     */
    public function addInclude(IncludeFile $include)
    {
        $this->includes[] = $include;
        return $this;
    }

    /**
     * Get copyParamsCollection
     *
     * @return ArrayCollection
     */
    public function getCopyParamsCollection()
    {
        return $this->copyParamsCollection;
    }

    /**
     * Set copyParamsCollection
     *
     * @param ArrayCollection copyParamsCollection
     *
     * @return self
     */
    public function setCopyParamsCollection(ArrayCollection $copyParamsCollection)
    {
        $this->copyParamsCollection = $copyParamsCollection;
        return $this;
    }

    /**
     * Add CopyParams in copyParamsCollection
     *
     * @param CopyParams $include
     *
     * @return self
     */
    public function addCopyParams(CopyParams $copyParams)
    {
        $this->copyParamsCollection[] = $copyParams;
        return $this;
    }
}
