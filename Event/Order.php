<?php
/**
 * Order Event.
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Event;

class Order extends AbstractEvent
{
    const ON_CREATE_ERROR = 'arii_joe.order_event.create.error';
    const ON_CREATE_POST  = 'arii_joe.order_event.create.post';
    const ON_CREATE_PRE   = 'arii_joe.order_event.create.pre';

    const ON_DELETE_POST  = 'arii_joe.order_event.delete.post';
    const ON_DELETE_PRE   = 'arii_joe.order_event.delete.pre';

    const ON_FETCH_ERROR  = 'arii_joe.order_event.fetch.error';
    const ON_FETCH_POST   = 'arii_joe.order_event.fetch.post';
    const ON_FETCH_PRE    = 'arii_joe.order_event.fetch.pre';

    const ON_UPDATE_ERROR = 'arii_joe.order_event.update.error';
    const ON_UPDATE_VALID = 'arii_joe.order_event.update.valid';
    const ON_UPDATE_POST  = 'arii_joe.order_event.update.post';
    const ON_UPDATE_PRE   = 'arii_joe.order_event.update.pre';
}
