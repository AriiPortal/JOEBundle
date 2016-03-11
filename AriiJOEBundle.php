<?php

namespace Arii\JOEBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;
use Doctrine\DBAL\Types\Type;

class AriiJOEBundle extends Bundle
{
    public function boot()
    {
        $em = $this->container->get('doctrine.orm.entity_manager');
        if (!$em->getConnection()->getDatabasePlatform()->hasDoctrineTypeMappingFor('uuid')) {
            if (!Type::hasType('uuid')) {
                Type::addType('uuid', 'Ramsey\Uuid\Doctrine\UuidType');
            }
            $em->getConnection()->getDatabasePlatform()->registerDoctrineTypeMapping('uuid', 'uuid');
        }
    }
}
