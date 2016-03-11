<?php
/**
 * JobChain Event.
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Event;

class JobChain extends AbstractEvent
{
    const ON_CREATE_ERROR = 'arii_joe.job_chain_event.create.error';
    const ON_CREATE_POST  = 'arii_joe.job_chain_event.create.post';
    const ON_CREATE_PRE   = 'arii_joe.job_chain_event.create.pre';

    const ON_DELETE_POST  = 'arii_joe.job_chain_event.delete.post';
    const ON_DELETE_PRE   = 'arii_joe.job_chain_event.delete.pre';

    const ON_FETCH_ERROR  = 'arii_joe.job_chain_event.fetch.error';
    const ON_FETCH_POST   = 'arii_joe.job_chain_event.fetch.post';
    const ON_FETCH_PRE    = 'arii_joe.job_chain_event.fetch.pre';

    const ON_UPDATE_ERROR = 'arii_joe.job_chain_event.update.error';
    const ON_UPDATE_VALID = 'arii_joe.job_chain_event.update.valid';
    const ON_UPDATE_POST  = 'arii_joe.job_chain_event.update.post';
    const ON_UPDATE_PRE   = 'arii_joe.job_chain_event.update.pre';
}
