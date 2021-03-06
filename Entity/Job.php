<?php
/**
 * Job Entity.
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @link   http://www.sos-berlin.com/doc/en/scheduler.doc/xml/job.xml
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Job
 *
 * @ORM\Table(name="JOE_JOB", uniqueConstraints={@ORM\UniqueConstraint(name="job_name", columns={"job_scheduler_id", "job_name"})})
 * @ORM\Entity
 */
class Job extends AbstractEntity
{

    /**
     * @var Arii\JOEBundle\Entity\JobScheduler
     *
     * @ORM\ManyToOne(targetEntity="JobScheduler")
     * @ORM\JoinColumn(name="job_scheduler_id", referencedColumnName="id", nullable=false)
     */
    protected $jobScheduler;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    protected $filename;

    /**
     * @var boolean
     *
     * @ORM\Column(type="boolean")
     */
    protected $enabled = true;

    /**
     * @var boolean
     *
     * @ORM\Column(name="force_idle_timeout", type="boolean")
     */
    protected $forceIdleTimeout = false;

    /**
     * @var String
     *
     * @ORM\Column(name="idle_timeout", type="string", nullable=true)
     */
    protected $idleTimeout = '5';

    /**
     * @var string
     *
     * @ORM\Column(name="ignore_signals", type="simple_array", nullable=true)
     */
    protected $ignoreSignals = array();

    /**
     * @var string
     *
     * @ORM\Column(name="java_options", type="text", nullable=true)
     */
    protected $javaOptions;

    /**
     * @var integer
     *
     * @ORM\Column(name="min_tasks", type="integer")
     */
    protected $minTasks = 0;

    /**
     * @var string
     *
     * @Assert\NotBlank()
     * @Assert\Length(max=255)
     * @ORM\Column(name="job_name", type="string", length=255, nullable=true)
     */
    protected $name;

    /**
     * @var boolean
     *
     * @ORM\Column(name="job_order", type="boolean", nullable=true)
     */
    protected $order;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=12, nullable=true)
     */
    protected $priority;

    /**
     * @var string
     *
     * @ORM\Column(name="process_class", type="string", nullable=true)
     */
    protected $processClass;

    /**
     * @var boolean
     *
     * @ORM\Column(name="job_replace", type="boolean")
     */
    protected $replace = true;

    /**
     * @var integer
     *
     * @ORM\Column(name="spooler_id", type="integer", nullable=true)
     */
    protected $spoolerId;

    /**
     * @var boolean
     *
     * @ORM\Column(name="stop_on_error", type="boolean")
     */
    protected $stopOnError = true;

    /**
     * @var integer
     *
     * @ORM\Column(name="tasks", type="integer")
     */
    protected $tasks = 1;

    /**
     * @var boolean
     *
     * @ORM\Column(name="temporary", type="boolean")
     */
    protected $temporary = false;

    /**
     * @var string
     *
     * @ORM\Column(type="string", nullable=true)
     */
    protected $timeout;

    /**
     * @var string
     *
     * @ORM\Column(type="text", nullable=true)
     */
    protected $title;

    /**
     * @var integer
     *
     * @ORM\Column(type="smallint")
     */
    protected $visible = 1;

    /**
     * @var string
     *
     * @ORM\Column(name="warn_if_longer_than", type="string", nullable=true)
     */
    protected $warnIfLongerThan;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="warn_if_shorter_than", type="string", nullable=true)
     */
    protected $warnIfShorterThan;

    /**
     * @var Description
     *
     * @ORM\OneToOne(targetEntity="Description", cascade={"all"})
     * @ORM\JoinColumn(name="description_id", referencedColumnName="id")
     */
    protected $description;

    /**
     *
     * @var ArrayCollection
     * @ORM\ManyToMany(targetEntity="LockUse", cascade={"all"})
     * @ORM\JoinTable(name="JOE_JOB_LOCK_USES",
     *      joinColumns={@ORM\JoinColumn(name="job_id", referencedColumnName="id", onDelete="CASCADE")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="lock_id", referencedColumnName="id", unique=true, onDelete="CASCADE")}
     *      )
     */
    protected $lockUses;

    /**
     *
     * @var ArrayCollection
     * @ORM\ManyToMany(targetEntity="MonitorUse", cascade={"all"})
     * @ORM\JoinTable(name="JOE_JOB_MONITOR_USES",
     *      joinColumns={@ORM\JoinColumn(name="job_id", referencedColumnName="id", onDelete="CASCADE")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="monitor_id", referencedColumnName="id", unique=true, onDelete="CASCADE")}
     *      )
     */
    protected $monitorUses;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="Variable", cascade={"all"})
     * @ORM\JoinTable(name="JOE_JOB_ENVIRONMENT_VARIABLES",
     *      joinColumns={@ORM\JoinColumn(name="job_id", referencedColumnName="id", onDelete="CASCADE")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="variable_id", referencedColumnName="id", unique=true, onDelete="CASCADE")}
     *      )
     */
    protected $environmentVariables;

    /**
     * @var Params
     *
     * @ORM\OneToOne(targetEntity="Params", cascade={"all"})
     * @ORM\JoinColumn(name="params_id", referencedColumnName="id")
     */
    protected $params;

    /**
     * @var Script
     *
     * @ORM\OneToOne(targetEntity="Script", cascade={"all"})
     * @ORM\JoinColumn(name="script_id", referencedColumnName="id")
     */
    protected $script;


     /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="Monitor", cascade={"all"})
     * @ORM\JoinTable(name="JOE_JOB_MONITOR",
     *      joinColumns={@ORM\JoinColumn(name="job_id", referencedColumnName="id", onDelete="CASCADE")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="monitor_id", referencedColumnName="id", unique=true, onDelete="CASCADE")}
     *      )
     */
    protected $monitors;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="StartWhenDirectoryChanged", cascade={"all"})
     * @ORM\JoinTable(name="JOE_JOB_START_WHEN_DIRECTORY_CHANGED",
     *      joinColumns={@ORM\JoinColumn(name="job_id", referencedColumnName="id", onDelete="CASCADE")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="start_when_directory_changed_id", referencedColumnName="id", unique=true, onDelete="CASCADE")}
     *      )
     */
    protected $startWhenDirectoryChanged;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="DelayAfterError", cascade={"all"})
     * @ORM\JoinTable(name="JOE_JOB_DELAY_AFTER_ERROR",
     *      joinColumns={@ORM\JoinColumn(name="job_id", referencedColumnName="id", onDelete="CASCADE")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="delay_after_error_id", referencedColumnName="id", unique=true, onDelete="CASCADE")}
     *      )
     */
    protected $delayAfterError;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="DelayOrderAfterSetback", cascade={"all"})
     * @ORM\JoinTable(name="ARII_JOB_JOE_DELAY_ORDER_AFTER_SETBACK",
     *      joinColumns={@ORM\JoinColumn(name="job_id", referencedColumnName="id", onDelete="CASCADE")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="delay_order_after_setback_id", referencedColumnName="id", unique=true, onDelete="CASCADE")}
     *      )
     */
    protected $delayOrderAfterSetBack;

    /**
     * @var RunTime
     *
     * @ORM\OneToOne(targetEntity="RunTime", cascade={"all"})
     * @ORM\JoinColumn(name="runtime_id", referencedColumnName="id")
     */
    protected $runtime;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="Commands", cascade={"all"})
     * @ORM\JoinTable(name="JOE_JOB_COMMANDS",
     *      joinColumns={@ORM\JoinColumn(name="job_id", referencedColumnName="id", onDelete="CASCADE")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="commands_id", referencedColumnName="id", unique=true, onDelete="CASCADE")}
     *      )
     */
    protected $commandsCollection;

    /**
     * Constructor
     *
     */
    public function __construct()
    {
        $this->delayAfterError           = new ArrayCollection;
        $this->delayOrderAfterSetBack    = new ArrayCollection;
        $this->environmentVariables      = new ArrayCollection;
        $this->lockUses                  = new ArrayCollection;
        $this->monitorUses               = new ArrayCollection;
        $this->startWhenDirectoryChanged = new ArrayCollection;
        $this->commandsCollection        = new ArrayCollection;
        $this->monitors                  = new ArrayCollection;
        return parent::__construct();
    }

    /**
     * Get jobScheduler
     *
     * @return Arii\JOEBundle\Entity\JobScheduler
     */
    public function getJobScheduler()
    {
        return $this->jobScheduler;
    }

    /**
     * Set jobScheduler
     *
     * @param Arii\JOEBundle\Entity\JobScheduler
     */
    public function setJobScheduler(JobScheduler $jobScheduler)
    {
        $this->jobScheduler = $jobScheduler;
        return $this;
    }

    /**
     * Get enabled
     *
     * @return boolean
     */
    public function getEnabled()
    {
        return $this->enabled;
    }

    /**
     * Set enabled
     *
     * @param boolean enabled
     */
    public function setEnabled($enabled = true)
    {
        $this->enabled = $enabled;
        return $this;
    }

    /**
     * Get forceIdleTimeout
     *
     * @return boolean
     */
    public function getForceIdleTimeout()
    {
        return $this->forceIdleTimeout;
    }

    /**
     * Set forceIdleTimeout
     *
     * @param boolean forceIdleTimeout
     */
    public function setForceIdleTimeout($forceIdleTimeout = false)
    {
        $this->forceIdleTimeout = $forceIdleTimeout;
        return $this;
    }

    /**
     * Get idleTimeout
     *
     * @return string
     */
    public function getIdleTimeout()
    {
        return $this->idleTimeout;
    }

    /**
     * Set idleTimeout
     *
     * @param string idleTimeout
     */
    public function setIdleTimeout( $idleTimeout)
    {
        $this->idleTimeout = $idleTimeout;
        return $this;
    }

    /**
     * Get ignoreSignals
     *
     * @return array
     */
    public function getIgnoreSignals()
    {
        return $this->ignoreSignals;
    }

    /**
     * Set ignoreSignals
     *
     * @param array ignoreSignals
     */
    public function setIgnoreSignals(array $ignoreSignals = array())
    {
        $this->ignoreSignals = $ignoreSignals;
        return $this;
    }

    /**
     * Get javaOptions
     *
     * @return string
     */
    public function getJavaOptions()
    {
        return $this->javaOptions;
    }

    /**
     * Set javaOptions
     *
     * @param string javaOptions
     */
    public function setJavaOptions($javaOptions)
    {
        $this->javaOptions = $javaOptions;
        return $this;
    }

    /**
     * Get minTasks
     *
     * @return integer
     */
    public function getMinTasks()
    {
        return $this->minTasks;
    }

    /**
     * Set minTasks
     *
     * @param integer minTasks
     */
    public function setMinTasks($minTasks)
    {
        $this->minTasks = $minTasks;
        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set name
     *
     * @param string name
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * Get order
     *
     * @return boolean
     */
    public function getOrder()
    {
        return $this->order;
    }

    /**
     * Set order
     *
     * @param boolean order
     */
    public function setOrder($order)
    {
        $this->order = $order;
        return $this;
    }

    /**
     * Get priority
     *
     * @return string
     */
    public function getPriority()
    {
        return $this->priority;
    }

    /**
     * Set priority
     *
     * @param string priority
     */
    public function setPriority($priority)
    {
        $this->priority = $priority;
        return $this;
    }

    /**
     * Get processClass
     *
     * @return string
     */
    public function getProcessClass()
    {
        return $this->processClass;
    }

    /**
     * Set processClass
     *
     * @param string processClass
     */
    public function setProcessClass($processClass)
    {
        $this->processClass = $processClass;
        return $this;
    }

    /**
     * Get replace
     *
     * @return boolean
     */
    public function getReplace()
    {
        return $this->replace;
    }

    /**
     * Set replace
     *
     * @param boolean replace
     */
    public function setReplace($replace)
    {
        $this->replace = $replace;
        return $this;
    }

    /**
     * Get spoolerId
     *
     * @return integer
     */
    public function getSpoolerId()
    {
        return $this->spoolerId;
    }

    /**
     * Set spoolerId
     *
     * @param integer spoolerId
     */
    public function setSpoolerId($spoolerId)
    {
        $this->spoolerId = $spoolerId;
        return $this;
    }

    /**
     * Get stopOnError
     *
     * @return boolean
     */
    public function getStopOnError()
    {
        return $this->stopOnError;
    }

    /**
     * Set stopOnError
     *
     * @param boolean stopOnError
     */
    public function setStopOnError($stopOnError)
    {
        $this->stopOnError = $stopOnError;
        return $this;
    }

    /**
     * Get tasks
     *
     * @return integer
     */
    public function getTasks()
    {
        return $this->tasks;
    }

    /**
     * Set tasks
     *
     * @param integer tasks
     */
    public function setTasks($tasks)
    {
        $this->tasks = $tasks;
        return $this;
    }

    /**
     * Get temporary
     *
     * @return boolean
     */
    public function getTemporary()
    {
        return $this->temporary;
    }

    /**
     * Set temporary
     *
     * @param boolean temporary
     */
    public function setTemporary($temporary)
    {
        $this->temporary = $temporary;
        return $this;
    }

    /**
     * Get timeout
     *
     * @return string
     */
    public function getTimeout()
    {
        return $this->timeout;
    }

    /**
     * Set timeout
     *
     * @param string timeout
     */
    public function setTimeout($timeout)
    {
        $this->timeout = $timeout;
        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set title
     *
     * @param string title
     */
    public function setTitle($title)
    {
        $this->title = $title;
        return $this;
    }

    /**
     * Get visible
     *
     * @return integer
     */
    public function getVisible()
    {
        return $this->visible;
    }

    /**
     * Set visible
     *
     * @param integer visible
     */
    public function setVisible($visible)
    {
        $this->visible = $visible;
        return $this;
    }

    /**
     * Get warnIfLongerThan
     *
     * @return DateTime
     */
    public function getWarnIfLongerThan()
    {
        return $this->warnIfLongerThan;
    }

    /**
     * Set warnIfLongerThan
     *
     * @param string warnIfLongerThan
     */
    public function setWarnIfLongerThan($warnIfLongerThan)
    {
        $this->warnIfLongerThan = $warnIfLongerThan;
        return $this;
    }

    /**
     * Get warnIfShorterThan
     *
     * @return DateTime
     */
    public function getWarnIfShorterThan()
    {
        return $this->warnIfShorterThan;
    }

    /**
     * Set warnIfShorterThan
     *
     * @param string warnIfShorterThan
     */
    public function setWarnIfShorterThan($warnIfShorterThan)
    {
        $this->warnIfShorterThan = $warnIfShorterThan;
        return $this;
    }

    /**
     * Get description
     *
     * @return Description
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set description
     *
     * @param Description description
     */
    public function setDescription(Description $description)
    {
        $this->description = $description;
        return $this;
    }

    /**
     * Get lockUses collection
     *
     * @return ArrayCollection
     */
    public function getLockUses()
    {
        return $this->lockUses;
    }

    /**
     * Set lockUses collection
     *
     * @param ArrayCollection lockUses
     *
     * @return self
     */
    public function setLockUses(ArrayCollection $lockUses)
    {
        $this->lockUses = $lockUses;
        return $this;
    }

    /**
     * Add lockUse in collection
     *
     * @param LockUse $lockUse
     *
     * @return self
     */
    public function addLockUse(LockUse $lockUse)
    {
        $this->lockUses[] = $lockUse;
        return $this;
    }


    /**
     * Get monitorUses collection
     *
     * @return ArrayCollection
     */
    public function getMonitorUses()
    {
        return $this->monitorUses;
    }

    /**
     * Set monitorUses collection
     *
     * @param ArrayCollection monitorUses
     *
     * @return self
     */
    public function setMonitorUses(ArrayCollection $monitorUses)
    {
        $this->monitorUses = $monitorUses;
        return $this;
    }

    /**
     * Add monitorUse in collection
     *
     * @param MonitorUse $monitorUse
     *
     * @return self
     */
    public function addMonitorUse(MonitorUse $monitorUse)
    {
        $this->monitorUses[] = $monitorUse;
        return $this;
    }

    /**
     * Get environment variables collection
     *
     * @return ArrayCollection
     */
    public function getEnvironmentVariables()
    {
        return $this->environmentVariables;
    }

    /**
     * Set environment variables collection
     *
     * @param ArrayCollection lockUses
     *
     * @return self
     */
    public function setEnvironmentVariables(ArrayCollection $environmentVariables)
    {
        $this->environmentVariables = $environmentVariables;
        return $this;
    }

    /**
     * Add environment variable in environment collection
     *
     * @param Variable $variable
     *
     * @return self
     */
    public function addEnvironmentVariable(Variable $environmentVariable)
    {
        $this->environmentVariables[] = $environmentVariable;
        return $this;
    }

    /**
     * Get params
     *
     * @return Params
     */
    public function getParams()
    {
        return $this->params;
    }

    /**
     * Set params
     *
     * @param Params $params
     *
     * @return self
     */
    public function setParams(Params $params)
    {
        $this->params = $params;
        return $this;
    }

    /**
     * Get Script
     *
     * @return Script
     */
    public function getScript()
    {
        return $this->script;
    }

    /**
     * Set Script
     *
     * @param Script Script
     *
     * @return self
     */
    public function setScript($script)
    {
        $this->script = $script;
        return $this;
    }

    /**
     * Get Monitors
     *
     * @return ArrayCollection
     */
    public function getMonitors()
    {
        return $this->monitors;
    }

    /**
     * Set Monitor
     *
     * @param Monitor Monitor
     *
     * @return self
     */
    public function setMonitors(ArrayCollection $monitors)
    {
        $this->monitors = $monitors;
        return $this;
    }

    /**
     * Add Monitor in collection
     *
     * @param Monitor $monitor
     *
     * @return self
     */
    public function addMonitor(Monitor $monitor)
    {
        $this->monitors[] = $monitor;
        return $this;
    }

    /**
     * Get StartWhenDirectoryChanged collection
     *
     * @return ArrayCollection
     */
    public function getStartWhenDirectoryChanged()
    {
        return $this->startWhenDirectoryChanged;
    }

    /**
     * Set StartWhenDirectoryChanged collection
     *
     * @param ArrayCollection $startWhenDirectoryChanged
     *
     * @return self
     */
    public function setStartWhenDirectoryChanged(ArrayCollection $startWhenDirectoryChanged)
    {
        $this->startWhenDirectoryChanged = $startWhenDirectoryChanged;
        return $this;
    }

    /**
     * Add StartWhenDirectoryChanged in collection
     *
     * @param StartWhenDirectoryChanged $startWhenDirectoryChanged
     *
     * @return self
     */
    public function addStartWhenDirectoryChanged(StartWhenDirectoryChanged $startWhenDirectoryChanged)
    {
        $this->startWhenDirectoryChanged[] = $startWhenDirectoryChanged;
        return $this;
    }

    /**
     * Get DelayAfterError collection
     *
     * @return ArrayCollection
     */
    public function getDelayAfterError()
    {
        return $this->delayAfterError;
    }

    /**
     * Set DelayAfterError collection
     *
     * @param ArrayCollection $delayAfterError
     *
     * @return self
     */
    public function setDelayAfterError(ArrayCollection $delayAfterError)
    {
        $this->delayAfterError = $delayAfterError;
        return $this;
    }

    /**
     * Add DelayAfterError in collection
     *
     * @param DelayAfterError $delayAfterError
     *
     * @return self
     */
    public function addDelayAfterError(DelayAfterError $delayAfterError)
    {
        $this->delayAfterError[] = $delayAfterError;
        return $this;
    }

    /**
     * Get DelayOrderAfterSetBack
     *
     * @return ArrayCollection
     */
    public function getDelayOrderAfterSetBack()
    {
        return $this->delayOrderAfterSetBack;
    }

    /**
     * Set DelayOrderAfterSetBack
     *
     * @param ArrayCollection $delayOrderAfterSetBack the delay order after set back
     *
     * @return self
     */
    public function setDelayOrderAfterSetBack(ArrayCollection $delayOrderAfterSetBack)
    {
        $this->delayOrderAfterSetBack = $delayOrderAfterSetBack;

        return $this;
    }

    /**
     * Add DelayOrderAfterSetBack in collection
     *
     * @param DelayOrderAfterSetBack $delayOrderAfterSetBack
     *
     * @return self
     */
    public function addDelayOrderAfterSetBack(DelayOrderAfterSetBack $delayOrderAfterSetBack)
    {
        $this->delayOrderAfterSetBack[] = $delayOrderAfterSetBack;
        return $this;
    }

    /**
     * Gets the value of runtime.
     *
     * @return RunTime
     */
    public function getRuntime()
    {
        return $this->runtime;
    }

    /**
     * Sets the value of runtime.
     *
     * @param RunTime $runtime the runtime
     *
     * @return self
     */
    public function setRuntime(RunTime $runtime)
    {
        $this->runtime = $runtime;

        return $this;
    }


    /**
     * Get commandsCollection
     *
     * @return ArrayCollection
     */
    public function getCommandsCollection()
    {
        return $this->commandsCollection;
    }

    /**
     * Set commandsCollection
     *
     * @param ArrayCollection $commandsCollection
     *
     * @return self
     */
    public function setCommandsCollection(
        ArrayCollection $commandsCollection
    ) {
        $this->commandsCollection = $commandsCollection;
        return $this;
    }

    /**
     * Add Commands in commandsCollection
     *
     * @param Commands $commands
     *
     * @return self
     */
    public function addCommands(
        Commands $commands
    ) {
        $this->commandsCollection[] = $commands;
        return $this;
    }

    /**
     * Gets the value of filename.
     *
     * @return string
     */
    public function getFilename()
    {
        return $this->filename;
    }

    /**
     * Sets the value of filename.
     *
     * @param string $filename the filename
     *
     * @return self
     */
    public function setFilename($filename)
    {
        $this->filename = $filename;

        return $this;
    }
}
