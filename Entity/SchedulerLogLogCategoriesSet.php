<?php
/**
 * SchedulerLogLogCategoriesSet Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * SchedulerLogLogCategoriesSet
 *
 * @ORM\Table(name="JOE_SCHEDULER_LOG_LOG_CATEGORIES_SET")
 * @ORM\Entity
 */
class SchedulerLogLogCategoriesSet extends AbstractEntity
{

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(name="category", type="string", length=255)
     */
    protected $category;

    /**
     * @var boolean
     *
     * @ORM\Column(type="boolean")
     */
    protected $value;

    /**
     * Gets the value of category.
     *
     * @return string
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Sets the value of category.
     *
     * @param string $category the category
     *
     * @return self
     */
    public function setCategory($category)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Gets the value of value.
     *
     * @return boolean
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * Sets the value of value.
     *
     * @param boolean $value the value
     *
     * @return self
     */
    public function setValue($value)
    {
        $this->value = $value;

        return $this;
    }
}
