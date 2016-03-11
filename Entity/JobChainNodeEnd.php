<?php
/**
 * JobChainNodeEnd Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * JobChainNodeEnd
 *
 * @ORM\Table(name="JOE_JOB_CHAIN_NODE_END")
 * @ORM\Entity
 */
class JobChainNodeEnd extends AbstractEntity
{


    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(type="string", length=255)
     */
    protected $state;


    /**
     * Gets the value of state.
     *
     * @return string
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * Sets the value of state.
     *
     * @param string $state the state
     *
     * @return self
     */
    public function setState($state)
    {
        $this->state = $state;

        return $this;
    }
}
