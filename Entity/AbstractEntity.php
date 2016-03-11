<?php
/**
 * Abstract Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * Abstract Entity
 *
 * @UniqueEntity(fields={"id"})
 */
abstract class AbstractEntity
{
    /**
     * @var \Ramsey\Uuid\Uuid
     *
     * @ORM\Id
     * @ORM\Column(type="uuid", unique=true)
     * @ORM\GeneratedValue(strategy="NONE")
     */
    protected $id;

    /**
     * Constructor
     *
     */
    public function __construct()
    {
        $this->id       = Uuid::uuid4();
        return $this;
    }

    /**
     * Get Id
     *
     * @return \Ramsey\Uuid\Uuid
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Sets the value of id.
     *
     * @param \Ramsey\Uuid\Uuid $id the id
     *
     * @return self
     */
    protected function setId(Uuid $id)
    {
        $this->id = $id;

        return $this;
    }
}
