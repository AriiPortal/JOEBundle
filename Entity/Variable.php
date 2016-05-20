<?php
/**
 * Variable Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Variable
 *
 * @ORM\Table(name="JOE_VARIABLE")
 * @ORM\Entity
 */
class Variable extends AbstractNameValue
{
}
