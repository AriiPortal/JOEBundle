<?php
/**
 * JobChain Entity
 *
 * @link   https://github.com/AriiPortal/JOEBundle
 * @author Bryan Folliot <bfolliot@clever-age.com>
 */

namespace Arii\JOEBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * JobChain
 *
 * @ORM\Table(name="JOE_JOB_CHAIN")
 * @ORM\Entity
 */
class JobChain extends AbstractEntity
{
    const VISIBLE_YES   = 1;
    const VISIBLE_NO    = 0;
    const VISIBLE_NEVER = -1;

    /**
     * @var Arii\JOEBundle\Entity\JobScheduler
     *
     * @ORM\ManyToOne(targetEntity="JobScheduler")
     * @ORM\JoinColumn(name="job_scheduler_id", referencedColumnName="id")
     */
    protected $jobScheduler;

    /**
     * @var boolean
     *
     * @ORM\Column(type="boolean")
     */
    protected $distributed = false;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(name="file_watching_process_class", type="string", length=255)
     */
    protected $fileWatchingProcessClass;

    /**
     * @var integer
     *
     * @Assert\GreaterThan(value=0)
     * @ORM\Column(name="max_orders", type="integer")
     */
    protected $maxOrders = 99999;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(type="string", length=255)
     */
    protected $name;

    /**
     * @var boolean
     *
     * @ORM\Column(name="orders_recoverable", type="boolean")
     */
    protected $ordersRecoverable = true;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(name="process_class", type="string", length=255)
     */
    protected $processClass;

    /**
     * @var string
     *
     * @Assert\Length(max=255)
     * @ORM\Column(type="string", length=255)
     */
    protected $title;

    /**
     * @var integer
     *
     * @Assert\Range(
     *      min = -1,
     *      max = 1
     * )
     * @ORM\Column(type="smallint", length=1)
     */
    protected $visible = self::VISIBLE_YES;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="FileOrderSource", cascade={"all"})
     * @ORM\JoinTable(name="JOE_JOB_CHAIN_FILE_ORDER_SOURCE",
     *      joinColumns={@ORM\JoinColumn(name="job_chain_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="file_order_source_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $fileOrderSourceCollection;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="JobChainNode", cascade={"all"})
     * @ORM\JoinTable(name="JOE_JOB_CHAIN_JOB_CHAIN_NODE",
     *      joinColumns={@ORM\JoinColumn(name="job_chain_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="job_chain_node_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $jobChainNodeCollection;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="FileOrderSink", cascade={"all"})
     * @ORM\JoinTable(name="JOE_JOB_CHAIN_FILE_ORDER_SINK",
     *      joinColumns={@ORM\JoinColumn(name="job_chain_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="file_order_sink_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $fileOrderSinkCollection;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="JobChainNodeJobChain", cascade={"all"})
     * @ORM\JoinTable(name="JOE_JOB_CHAIN_JOB_CHAIN_NODE_JOB_CHAIN",
     *      joinColumns={@ORM\JoinColumn(name="job_chain_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="job_chain_node_job_chain_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $jobChainNodeJobChainCollection;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="JobChainNodeEnd", cascade={"all"})
     * @ORM\JoinTable(name="JOE_JOB_CHAIN_JOB_CHAIN_NODE_END",
     *      joinColumns={@ORM\JoinColumn(name="job_chain_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="job_chain_node_end_id", referencedColumnName="id", unique=true)}
     *      )
     */
    protected $jobChainNodeEndCollection;

    /**
     * Constructor
     *
     */
    public function __construct()
    {
        $this->fileOrderSourceCollection      = new ArrayCollection;
        $this->jobChainNodeCollection         = new ArrayCollection;
        $this->fileOrderSinkCollection        = new ArrayCollection;
        $this->jobChainNodeJobChainCollection = new ArrayCollection;
        $this->jobChainNodeEndCollection      = new ArrayCollection;
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
     * Gets the value of distributed.
     *
     * @return boolean
     */
    public function getDistributed()
    {
        return $this->distributed;
    }

    /**
     * Sets the value of distributed.
     *
     * @param boolean $distributed the distributed
     *
     * @return self
     */
    public function setDistributed($distributed)
    {
        $this->distributed = $distributed;

        return $this;
    }

    /**
     * Gets the value of fileWatchingProcessClass.
     *
     * @return string
     */
    public function getFileWatchingProcessClass()
    {
        return $this->fileWatchingProcessClass;
    }

    /**
     * Sets the value of fileWatchingProcessClass.
     *
     * @param string $fileWatchingProcessClass the file watching process class
     *
     * @return self
     */
    public function setFileWatchingProcessClass($fileWatchingProcessClass)
    {
        $this->fileWatchingProcessClass = $fileWatchingProcessClass;

        return $this;
    }

    /**
     * Gets the value of maxOrders.
     *
     * @return integer
     */
    public function getMaxOrders()
    {
        return $this->maxOrders;
    }

    /**
     * Sets the value of maxOrders.
     *
     * @param integer $maxOrders the max orders
     *
     * @return self
     */
    public function setMaxOrders($maxOrders)
    {
        $this->maxOrders = $maxOrders;

        return $this;
    }

    /**
     * Gets the value of name.
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Sets the value of name.
     *
     * @param string $name the name
     *
     * @return self
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Gets the value of ordersRecoverable.
     *
     * @return boolean
     */
    public function getOrdersRecoverable()
    {
        return $this->ordersRecoverable;
    }

    /**
     * Sets the value of ordersRecoverable.
     *
     * @param boolean $ordersRecoverable the orders recoverable
     *
     * @return self
     */
    public function setOrdersRecoverable($ordersRecoverable)
    {
        $this->ordersRecoverable = $ordersRecoverable;

        return $this;
    }

    /**
     * Gets the value of processClass.
     *
     * @return string
     */
    public function getProcessClass()
    {
        return $this->processClass;
    }

    /**
     * Sets the value of processClass.
     *
     * @param string $processClass the process class
     *
     * @return self
     */
    public function setProcessClass($processClass)
    {
        $this->processClass = $processClass;

        return $this;
    }

    /**
     * Gets the value of title.
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Sets the value of title.
     *
     * @param string $title the title
     *
     * @return self
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Gets the visibility.
     *
     * @return integer
     */
    public function getVisible()
    {
        return $this->visible;
    }

    /**
     * Sets the visiblity
     *
     * @param integer $visible the visibility
     *
     * @return self
     */
    public function setVisible($visible)
    {
        $this->visible = $visible;

        return $this;
    }

    /**
     * Get fileOrderSourceCollection
     *
     * @return ArrayCollection
     */
    public function getFileOrderSourceCollection()
    {
        return $this->fileOrderSourceCollection;
    }

    /**
     * Set fileOrderSourceCollection
     *
     * @param ArrayCollection $fileOrderSourceCollection
     *
     * @return self
     */
    public function setFileOrderSourceCollection(
        ArrayCollection $fileOrderSourceCollection
    ) {
        $this->fileOrderSourceCollection = $fileOrderSourceCollection;
        return $this;
    }

    /**
     * Add FileOrderSource in fileOrderSourceCollection
     *
     * @param FileOrderSource $fileOrderSource
     *
     * @return self
     */
    public function addFileOrderSource(
        FileOrderSource $fileOrderSource
    ) {
        $this->fileOrderSourceCollection[] = $fileOrderSource;
        return $this;
    }

    /**
     * Get fileOrderSinkCollection
     *
     * @return ArrayCollection
     */
    public function getFileOrderSinkCollection()
    {
        return $this->fileOrderSinkCollection;
    }

    /**
     * Set fileOrderSinkCollection
     *
     * @param ArrayCollection $fileOrderSinkCollection
     *
     * @return self
     */
    public function setFileOrderSinkCollection(
        ArrayCollection $fileOrderSinkCollection
    ) {
        $this->fileOrderSinkCollection = $fileOrderSinkCollection;
        return $this;
    }

    /**
     * Add FileOrderSink in fileOrderSinkCollection
     *
     * @param FileOrderSink $fileOrderSink
     *
     * @return self
     */
    public function addFileOrderSink(
        FileOrderSink $fileOrderSink
    ) {
        $this->fileOrderSinkCollection[] = $fileOrderSink;
        return $this;
    }

    /**
     * Get jobChainNodeCollection
     *
     * @return ArrayCollection
     */
    public function getJobChainNodeCollection()
    {
        return $this->jobChainNodeCollection;
    }

    /**
     * Set jobChainNodeCollection
     *
     * @param ArrayCollection $jobChainNodeCollection
     *
     * @return self
     */
    public function setJobChainNodeCollection(
        ArrayCollection $jobChainNodeCollection
    ) {
        $this->jobChainNodeCollection = $jobChainNodeCollection;
        return $this;
    }

    /**
     * Add JobChainNodeCollection in jobChainNodeCollection
     *
     * @param JobChainNode $jobChainNode
     *
     * @return self
     */
    public function addJobChainNode(
        JobChainNode $jobChainNode
    ) {
        $this->jobChainNodeCollection[] = $jobChainNode;
        return $this;
    }

    /**
     * Get jobChainNodeJobChainCollection
     *
     * @return ArrayCollection
     */
    public function getJobChainNodeJobChainCollection()
    {
        return $this->jobChainNodeJobChainCollection;
    }

    /**
     * Set jobChainNodeJobChainCollection
     *
     * @param ArrayCollection $jobChainNodeJobChainCollection
     *
     * @return self
     */
    public function setJobChainNodeJobChainCollection(
        ArrayCollection $jobChainNodeJobChainCollection
    ) {
        $this->jobChainNodeJobChainCollection = $jobChainNodeJobChainCollection;
        return $this;
    }

    /**
     * Add JobChainNodeJobChain in jobChainNodeJobChainCollection
     *
     * @param JobChainNodeJobChain $jobChainNodeJobChain
     *
     * @return self
     */
    public function addJobChainNodeJobChain(
        JobChainNodeJobChain $jobChainNodeJobChain
    ) {
        $this->jobChainNodeJobChainCollection[] = $jobChainNodeJobChain;
        return $this;
    }

    /**
     * Get jobChainNodeEndCollection
     *
     * @return ArrayCollection
     */
    public function getJobChainNodeEndCollection()
    {
        return $this->jobChainNodeEndCollection;
    }

    /**
     * Set jobChainNodeEndCollection
     *
     * @param ArrayCollection $jobChainNodeEndCollection
     *
     * @return self
     */
    public function setJobChainNodeEndCollection(
        ArrayCollection $jobChainNodeEndCollection
    ) {
        $this->jobChainNodeEndCollection = $jobChainNodeEndCollection;
        return $this;
    }

    /**
     * Add JobChainNodeEnd in jobChainNodeEndCollection
     *
     * @param JobChainNodeEnd $jobChainNodeEnd
     *
     * @return self
     */
    public function addJobChainNodeEnd(
        JobChainNodeEnd $jobChainNodeEnd
    ) {
        $this->jobChainNodeEndCollection[] = $jobChainNodeEnd;
        return $this;
    }
}
