<?php
/**
 * Param Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

/**
 * Param
 *
 * @ORM\Table(name="JOE_PARAM")
 * @ORM\Entity
 */
class Param extends AbstractNameValue
{
}
