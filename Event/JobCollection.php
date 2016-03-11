<?php
/**
 * Job Collection Event.
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Event;

class JobCollection extends AbstractEvent
{
    const ON_FETCH_ERROR = 'arii_joe.job_collection_event.fetch.error';
    const ON_FETCH_POST  = 'arii_joe.job_collection_event.fetch.post';
    const ON_FETCH_PRE   = 'arii_joe.job_collection_event.fetch.pre';
}
