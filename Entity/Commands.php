<?php
/**
 * Commands Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Commands
 *
 * @ORM\Table(name="JOE_COMMANDS")
 * @ORM\Entity
 */
class Commands extends AbstractEntity
{
    /**
     * @var string
     *
     * @Assert\NotBlank()
     * @Assert\Length(max=255)
     * @ORM\Column(name="on_exit_code", type="string", length=255)
     */
    protected $onExitCode;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="AddJobs", cascade={"all"})
     * @ORM\JoinTable(name="JOE_COMMANDS_ADD_JOBS",
     *      joinColumns={@ORM\JoinColumn(name="commands_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="add_jobs_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $addJobsCollection;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="AddOrder", cascade={"all"})
     * @ORM\JoinTable(name="JOE_COMMANDS_ADD_ORDER",
     *      joinColumns={@ORM\JoinColumn(name="commands_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="add_order_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $addOrderCollection;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="ModifyJob", cascade={"all"})
     * @ORM\JoinTable(name="JOE_COMMANDS_MODIFY_JOB",
     *      joinColumns={@ORM\JoinColumn(name="commands_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="modify_job_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $modifyJobCollection;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="ModifyOrder", cascade={"all"})
     * @ORM\JoinTable(name="JOE_COMMANDS_MODIFY_ORDER",
     *      joinColumns={@ORM\JoinColumn(name="commands_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="modify_order_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $modifyOrderCollection;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="ModifySpooler", cascade={"all"})
     * @ORM\JoinTable(name="JOE_COMMANDS_MODIFY_SPOOLER",
     *      joinColumns={@ORM\JoinColumn(name="commands_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="modify_spooler_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $modifySpoolerCollection;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="SchedulerLogLogCategoriesReset", cascade={"all"})
     * @ORM\JoinTable(name="JOE_COMMANDS_SCHEDULER_LOG_LOG_CATEGORIES_RESET",
     *      joinColumns={@ORM\JoinColumn(name="commands_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="scheduler_log_log_categories_reset_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $schedulerLogLogCategoriesResetCollection;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="SchedulerLogLogCategoriesSet", cascade={"all"})
     * @ORM\JoinTable(name="JOE_COMMANDS_SCHEDULER_LOG_LOG_CATEGORIES_SET",
     *      joinColumns={@ORM\JoinColumn(name="commands_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="scheduler_log_log_categories_set_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $schedulerLogLogCategoriesSetCollection;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="SchedulerLogLogCategoriesShow", cascade={"all"})
     * @ORM\JoinTable(name="JOE_COMMANDS_SCHEDULER_LOG_LOG_CATEGORIES_SHOW",
     *      joinColumns={@ORM\JoinColumn(name="commands_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="scheduler_log_log_categories_show_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $schedulerLogLogCategoriesShowCollection;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="ShowHistory", cascade={"all"})
     * @ORM\JoinTable(name="JOE_COMMANDS_SHOW_HISTORY",
     *      joinColumns={@ORM\JoinColumn(name="commands_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="show_history_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $showHistoryCollection;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="ShowJob", cascade={"all"})
     * @ORM\JoinTable(name="JOE_COMMANDS_SHOW_JOB",
     *      joinColumns={@ORM\JoinColumn(name="commands_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="show_job_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $showJobCollection;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="ShowJobs", cascade={"all"})
     * @ORM\JoinTable(name="JOE_COMMANDS_SHOW_JOBS",
     *      joinColumns={@ORM\JoinColumn(name="commands_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="show_jobs_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $showJobsCollection;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="ShowJobChain", cascade={"all"})
     * @ORM\JoinTable(name="JOE_COMMANDS_SHOW_JOB_CHAIN",
     *      joinColumns={@ORM\JoinColumn(name="commands_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="show_job_chain_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $showJobChainCollection;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="ShowState", cascade={"all"})
     * @ORM\JoinTable(name="JOE_COMMANDS_SHOW_STATE",
     *      joinColumns={@ORM\JoinColumn(name="commands_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="show_state_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $showStateCollection;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="StartJob", cascade={"all"})
     * @ORM\JoinTable(name="JOE_COMMANDS_START_JOB",
     *      joinColumns={@ORM\JoinColumn(name="commands_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="start_job_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $startJobCollection;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="Terminate", cascade={"all"})
     * @ORM\JoinTable(name="JOE_COMMANDS_TERMINATE",
     *      joinColumns={@ORM\JoinColumn(name="commands_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="terminate_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $terminateCollection;

    /**
     * Constructor
     *
     */
    public function __construct()
    {
        $this->addJobsCollection                        = new ArrayCollection;
        $this->addOrderCollection                       = new ArrayCollection;
        $this->modifyJobCollection                      = new ArrayCollection;
        $this->modifyOrderCollection                    = new ArrayCollection;
        $this->modifySpoolerCollection                  = new ArrayCollection;
        $this->schedulerLogLogCategoriesResetCollection = new ArrayCollection;
        $this->schedulerLogLogCategoriesSetCollection   = new ArrayCollection;
        $this->schedulerLogLogCategoriesShowCollection  = new ArrayCollection;
        $this->showHistoryCollection                    = new ArrayCollection;
        $this->showJobCollection                        = new ArrayCollection;
        $this->showJobsCollection                       = new ArrayCollection;
        $this->showJobChainCollection                   = new ArrayCollection;
        $this->showStateCollection                      = new ArrayCollection;
        $this->startJobCollection                       = new ArrayCollection;
        $this->terminateCollection                      = new ArrayCollection;
        return parent::__construct();
    }

    /**
     * Get addJobsCollection
     *
     * @return ArrayCollection
     */
    public function getAddJobsCollection()
    {
        return $this->addJobsCollection;
    }

    /**
     * Set Collection
     *
     * @param ArrayCollection $addJobsCollection
     *
     * @return self
     */
    public function setAddJobsCollection(ArrayCollection $addJobsCollection)
    {
        $this->addJobsCollection = $addJobsCollection;
        return $this;
    }

    /**
     * Add AddJobs in addJobsCollection
     *
     * @param AddJobs $job
     *
     * @return self
     */
    public function addAddJobs(AddJobs $addJobs)
    {
        $this->addJobsCollection[] = $addJobs;
        return $this;
    }

    /**
     * Get addOrderCollection
     *
     * @return ArrayCollection
     */
    public function getAddOrderCollection()
    {
        return $this->addOrderCollection;
    }

    /**
     * Set addOrderCollection
     *
     * @param ArrayCollection $addOrderCollection
     *
     * @return self
     */
    public function setAddOrderCollection(ArrayCollection $addOrderCollection)
    {
        $this->addOrderCollection = $addOrderCollection;
        return $this;
    }

    /**
     * Add AddOrder in addOrderCollection
     *
     * @param AddOrder $addOrder
     *
     * @return self
     */
    public function addAddOrder(AddOrder $addOrder)
    {
        $this->addOrderCollection[] = $addOrder;
        return $this;
    }

    /**
     * Get modifyJobCollection
     *
     * @return ArrayCollection
     */
    public function getModifyJobCollection()
    {
        return $this->modifyJobCollection;
    }

    /**
     * Set modifyJobCollection
     *
     * @param ArrayCollection $modifyJobCollection
     *
     * @return self
     */
    public function setModifyJobCollection(ArrayCollection $modifyJobCollection)
    {
        $this->modifyJobCollection = $modifyJobCollection;
        return $this;
    }

    /**
     * Add ModifyJob in modifyJobCollection
     *
     * @param ModifyJob $modifyJob
     *
     * @return self
     */
    public function addModifyJob(ModifyJob $modifyJob)
    {
        $this->modifyJobCollection[] = $modifyJob;
        return $this;
    }

    /**
     * Get modifyOrderCollection
     *
     * @return ArrayCollection
     */
    public function getModifyOrderCollection()
    {
        return $this->modifyOrderCollection;
    }

    /**
     * Set modifyOrderCollection
     *
     * @param ArrayCollection $modifyOrderCollection
     *
     * @return self
     */
    public function setModifyOrderCollection(ArrayCollection $modifyOrderCollection)
    {
        $this->modifyOrderCollection = $modifyOrderCollection;
        return $this;
    }

    /**
     * Add ModifyOrder in modifyOrderCollection
     *
     * @param ModifyOrder $modifyOrder
     *
     * @return self
     */
    public function addModifyOrder(ModifyOrder $modifyOrder)
    {
        $this->modifyOrderCollection[] = $modifyOrder;
        return $this;
    }

    /**
     * Get modifySpoolerCollection
     *
     * @return ArrayCollection
     */
    public function getModifySpoolerCollection()
    {
        return $this->modifySpoolerCollection;
    }

    /**
     * Set modifySpoolerCollection
     *
     * @param ArrayCollection $modifySpoolerCollection
     *
     * @return self
     */
    public function setModifySpoolerCollection(ArrayCollection $modifySpoolerCollection)
    {
        $this->modifySpoolerCollection = $modifySpoolerCollection;
        return $this;
    }

    /**
     * Add ModifySpooler in modifySpoolerCollection
     *
     * @param ModifySpooler $modifySpooler
     *
     * @return self
     */
    public function addModifySpooler(ModifySpooler $modifySpooler)
    {
        $this->modifySpoolerCollection[] = $modifySpooler;
        return $this;
    }

    /**
     * Get schedulerLogLogCategoriesResetCollection
     *
     * @return ArrayCollection
     */
    public function getSchedulerLogLogCategoriesResetCollection()
    {
        return $this->schedulerLogLogCategoriesResetCollection;
    }

    /**
     * Set schedulerLogLogCategoriesResetCollection
     *
     * @param ArrayCollection $schedulerLogLogCategoriesResetCollection
     *
     * @return self
     */
    public function setSchedulerLogLogCategoriesResetCollection(
        ArrayCollection $schedulerLogLogCategoriesResetCollection
    ) {
        $this->schedulerLogLogCategoriesResetCollection = $schedulerLogLogCategoriesResetCollection;
        return $this;
    }

    /**
     * Add SchedulerLogLogCategoriesReset in schedulerLogLogCategoriesResetCollection
     *
     * @param SchedulerLogLogCategoriesReset $schedulerLogLogCategoriesReset
     *
     * @return self
     */
    public function addSchedulerLogLogCategoriesReset(
        SchedulerLogLogCategoriesReset $schedulerLogLogCategoriesReset
    ) {
        $this->schedulerLogLogCategoriesResetCollection[] = $schedulerLogLogCategoriesReset;
        return $this;
    }

    /**
     * Get schedulerLogLogCategoriesSetCollection
     *
     * @return ArrayCollection
     */
    public function getSchedulerLogLogCategoriesSetCollection()
    {
        return $this->schedulerLogLogCategoriesSetCollection;
    }

    /**
     * Set schedulerLogLogCategoriesSetCollection
     *
     * @param ArrayCollection $schedulerLogLogCategoriesSetCollection
     *
     * @return self
     */
    public function setSchedulerLogLogCategoriesSetCollection(
        ArrayCollection $schedulerLogLogCategoriesSetCollection
    ) {
        $this->schedulerLogLogCategoriesSetCollection = $schedulerLogLogCategoriesSetCollection;
        return $this;
    }

    /**
     * Add SchedulerLogLogCategoriesSet in schedulerLogLogCategoriesSetCollection
     *
     * @param SchedulerLogLogCategoriesSet $schedulerLogLogCategoriesSet
     *
     * @return self
     */
    public function addSchedulerLogLogCategoriesSet(
        SchedulerLogLogCategoriesSet $schedulerLogLogCategoriesSet
    ) {
        $this->schedulerLogLogCategoriesSetCollection[] = $schedulerLogLogCategoriesSet;
        return $this;
    }

    /**
     * Get schedulerLogLogCategoriesShowCollection
     *
     * @return ArrayCollection
     */
    public function getSchedulerLogLogCategoriesShowCollection()
    {
        return $this->schedulerLogLogCategoriesShowCollection;
    }

    /**
     * Set schedulerLogLogCategoriesShowCollection
     *
     * @param ArrayCollection $schedulerLogLogCategoriesShowCollection
     *
     * @return self
     */
    public function setSchedulerLogLogCategoriesShowCollection(
        ArrayCollection $schedulerLogLogCategoriesShowCollection
    ) {
        $this->schedulerLogLogCategoriesShowCollection = $schedulerLogLogCategoriesShowCollection;
        return $this;
    }

    /**
     * Add SchedulerLogLogCategoriesShow in schedulerLogLogCategoriesShowCollection
     *
     * @param SchedulerLogLogCategoriesShow $schedulerLogLogCategoriesShow
     *
     * @return self
     */
    public function addSchedulerLogLogCategoriesShow(
        SchedulerLogLogCategoriesShow $schedulerLogLogCategoriesShow
    ) {
        $this->schedulerLogLogCategoriesShowCollection[] = $schedulerLogLogCategoriesShow;
        return $this;
    }

    /**
     * Get showHistoryCollection
     *
     * @return ArrayCollection
     */
    public function getShowHistoryCollection()
    {
        return $this->showHistoryCollection;
    }

    /**
     * Set showHistoryCollection
     *
     * @param ArrayCollection $showHistoryCollection
     *
     * @return self
     */
    public function setShowHistoryCollection(
        ArrayCollection $showHistoryCollection
    ) {
        $this->showHistoryCollection = $showHistoryCollection;
        return $this;
    }

    /**
     * Add ShowHistory in showHistoryCollection
     *
     * @param ShowHistory $showHistory
     *
     * @return self
     */
    public function addShowHistory(
        ShowHistory $showHistory
    ) {
        $this->showHistoryCollection[] = $showHistory;
        return $this;
    }

    /**
     * Get showJobCollection
     *
     * @return ArrayCollection
     */
    public function getShowJobCollection()
    {
        return $this->showJobCollection;
    }

    /**
     * Set showJobCollection
     *
     * @param ArrayCollection $showJobCollection
     *
     * @return self
     */
    public function setShowJobCollection(
        ArrayCollection $showJobCollection
    ) {
        $this->showJobCollection = $showJobCollection;
        return $this;
    }

    /**
     * Add ShowJob in showJobCollection
     *
     * @param ShowJob $showJob
     *
     * @return self
     */
    public function addShowJob(
        ShowJob $showJob
    ) {
        $this->showJobCollection[] = $showJob;
        return $this;
    }

    /**
     * Get showJobsCollection
     *
     * @return ArrayCollection
     */
    public function getShowJobsCollection()
    {
        return $this->showJobsCollection;
    }

    /**
     * Set showJobsCollection
     *
     * @param ArrayCollection $showJobsCollection
     *
     * @return self
     */
    public function setShowJobsCollection(
        ArrayCollection $showJobsCollection
    ) {
        $this->showJobsCollection = $showJobsCollection;
        return $this;
    }

    /**
     * Add ShowJobs in showJobsCollection
     *
     * @param ShowJobs $showJobs
     *
     * @return self
     */
    public function addShowJobs(
        ShowJobs $showJobs
    ) {
        $this->showJobsCollection[] = $showJobs;
        return $this;
    }

    /**
     * Get showJobChainCollection
     *
     * @return ArrayCollection
     */
    public function getShowJobChainCollection()
    {
        return $this->showJobChainCollection;
    }

    /**
     * Set showJobChainCollection
     *
     * @param ArrayCollection $showJobChainCollection
     *
     * @return self
     */
    public function setShowJobChainCollection(
        ArrayCollection $showJobChainCollection
    ) {
        $this->showJobChainCollection = $showJobChainCollection;
        return $this;
    }

    /**
     * Add ShowJobChain in showJobChainCollection
     *
     * @param ShowJobChain $showJobChain
     *
     * @return self
     */
    public function addShowJobChain(
        ShowJobChain $showJobChain
    ) {
        $this->showJobChainCollection[] = $showJobChain;
        return $this;
    }

    /**
     * Get showStateCollection
     *
     * @return ArrayCollection
     */
    public function getShowStateCollection()
    {
        return $this->showStateCollection;
    }

    /**
     * Set showStateCollection
     *
     * @param ArrayCollection $showStateCollection
     *
     * @return self
     */
    public function setShowStateCollection(
        ArrayCollection $showStateCollection
    ) {
        $this->showStateCollection = $showStateCollection;
        return $this;
    }

    /**
     * Add ShowState in showStateCollection
     *
     * @param ShowState $showState
     *
     * @return self
     */
    public function addShowState(
        ShowState $showState
    ) {
        $this->showStateCollection[] = $showState;
        return $this;
    }

    /**
     * Get startJobCollection
     *
     * @return ArrayCollection
     */
    public function getStartJobCollection()
    {
        return $this->startJobCollection;
    }

    /**
     * Set startJobCollection
     *
     * @param ArrayCollection $startJobCollection
     *
     * @return self
     */
    public function setStartJobCollection(
        ArrayCollection $startJobCollection
    ) {
        $this->startJobCollection = $startJobCollection;
        return $this;
    }

    /**
     * Add StartJob in startJobCollection
     *
     * @param StartJob $startJob
     *
     * @return self
     */
    public function addStartJob(
        StartJob $startJob
    ) {
        $this->startJobCollection[] = $startJob;
        return $this;
    }

    /**
     * Get terminateCollection
     *
     * @return ArrayCollection
     */
    public function getTerminateCollection()
    {
        return $this->terminateCollection;
    }

    /**
     * Set terminateCollection
     *
     * @param ArrayCollection $terminateCollection
     *
     * @return self
     */
    public function setTerminateCollection(
        ArrayCollection $terminateCollection
    ) {
        $this->terminateCollection = $terminateCollection;
        return $this;
    }

    /**
     * Add Terminate in terminateCollection
     *
     * @param Terminate $terminate
     *
     * @return self
     */
    public function addTerminate(
        Terminate $terminate
    ) {
        $this->terminateCollection[] = $terminate;
        return $this;
    }
}
