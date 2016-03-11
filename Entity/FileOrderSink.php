<?php
/**
 * FileOrderSink Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * FileOrderSink
 *
 * @ORM\Table(name="JOE_FILE_ORDER_SINK")
 * @ORM\Entity
 */
class FileOrderSink extends AbstractEntity
{

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(name="move_to", type="string", length=255)
     */
    protected $moveTo;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(type="string", length=255)
     */
    protected $state;

    /**
     * @var boolean
     *
     * @ORM\Column(type="boolean")
     */
    protected $remove;


    /**
     * Gets the value of moveTo.
     *
     * @return string
     */
    public function getMoveTo()
    {
        return $this->moveTo;
    }

    /**
     * Sets the value of moveTo.
     *
     * @param string $moveTo the move to
     *
     * @return self
     */
    public function setMoveTo($moveTo)
    {
        $this->moveTo = $moveTo;

        return $this;
    }

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

    /**
     * Gets the value of remove.
     *
     * @return boolean
     */
    public function getRemove()
    {
        return $this->remove;
    }

    /**
     * Sets the value of remove.
     *
     * @param boolean $remove the remove
     *
     * @return self
     */
    public function setRemove($remove)
    {
        $this->remove = $remove;

        return $this;
    }
}
