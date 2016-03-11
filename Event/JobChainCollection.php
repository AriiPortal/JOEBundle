<?php
/**
 * JobChain Collection Event.
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Event;

class JobChainCollection extends AbstractEvent
{
    const ON_FETCH_ERROR = 'arii_joe.job_chain_collection_event.fetch.error';
    const ON_FETCH_POST  = 'arii_joe.job_chain_collection_event.fetch.post';
    const ON_FETCH_PRE   = 'arii_joe.job_chain_collection_event.fetch.pre';
}
