joe.loader.load('utils/binder/standalone_binder', function(StandaloneBinder) {
joe.loader.load('utils/binder/entity_binder', function(EntityBinder) {
	var buildTree = (function() {

		function genLoadViewNode(label, view) {
			var builder = function (binder) {
				var node = new Node();

				node.onClick = function() {
					joe.view.load(view, binder);
				}

				node.init(true, label);
				return node;
			}
			return builder;
		}


		function jobProcess (binder) {

		}

		function jobProcessing(binder)
		{
			function jobProcess (binder) {
				var node = new DataNode(binder, { name: true });

				node.onClick = function() {
					joe.view.load('views/job/processing/process', binder);
				}

				node.receive = function (data) {
					node.setVisible(true);
					node.tree.obj.setItemText(node.obj.id, data.name);
				}

				node.init(true, "");
				return node;
			}

			var binder = new EntityBinder('monitor', binder, 'monitors');
			var monitors = new CollectionNode(target, binder, jobProcess,  { name: true });

			monitors.onClick = function () {
				joe.view.load('views/job/processing', binder);
			};

			monitors.init(true, 'Pre-/Post-Processing');
			return monitors;
		}

		jobSub = [
			genLoadViewNode('Options', 'views/job/options'),
			genLoadViewNode('Parameter', 'views/job/parameter'),
			genLoadViewNode('Job Settings', 'views/job/settings'),
			jobProcessing,
			genLoadViewNode('Run options', 'views/job/runoptions'),
			genLoadViewNode('Locks used', 'views/job/locksused'),
			genLoadViewNode('Monitors used', 'views/job/monitorsused'),

			/* TODO: Real runtime node gen */
			genLoadViewNode('Run Time', 'views/job/runtime'),

			genLoadViewNode('Commands', 'views/job/commands'),
			genLoadViewNode('Documentation', 'views/job/documentation')
		];

		function addJobs(tree) {
			function job (binder) {
				var node = new DataNode(binder, { name: true });

				node.onClick = function() {
					joe.view.load('views/job/main', binder);
				}

				node.loadChildren = function(callback) {
					for (var i = 0; i < jobSub.length; i++)
					{
						var sub = (jobSub[i])(binder);
						sub.addTo(tree, node.obj.id);
					}
					callback();
				}

				node.receive = function (data) {
					node.setVisible(true);
					node.tree.obj.setItemText(node.obj.id, data.name);
				}

				node.init(true, "");
				return node;
			}

			var target = 'job';
			var binder = new StandaloneBinder(target);
			var jobs = new CollectionNode(target, binder, job, { name: true });

			jobs.onClick = function() {
				joe.view.load('views/jobs', binder);
			}

			jobs.init(false, "Jobs");
			jobs.addTo(tree, tree.obj.rootId);
		}


		function addChains(tree) {
			function chain (binder) {
				var node = new DataNode(binder, { name: true });

				node.onClick = function() {
					console.log("loadInterface: ", binder.id);
				}


				node.receive = function (data) {
					node.setVisible(true);
					node.tree.obj.setItemText(node.obj.id, data.name);
				}

				node.init(true, "");
				return node;
			}

			var target = 'jobChain';
			var binder = new StandaloneBinder(target);
			var chains = new CollectionNode(target, binder, chain, { name: true });

			chains.onClick = function() {
				joe.view.load('views/chains', binder);
			}

			chains.init(false, "Job Chains");
			chains.addTo(tree, tree.obj.rootId);
		}

		function addOrders(tree) {
			function order (binder) {
				var node = new DataNode(binder, { name: true });

				node.onClick = function() {
					console.log("loadInterface: ", binder.id);
				}


				node.receive = function (data) {
					node.setVisible(true);
					node.tree.obj.setItemText(node.obj.id, data.name);
				}

				node.init(true, "");
				return node;
			}

			var target = 'order';
			var binder = new StandaloneBinder(target);
			var orders = new CollectionNode(target, binder, order, { name: true });

			orders.onClick = function() {
				joe.view.load('views/orders', binder);
			}

			orders.init(false, "Job Chains Order");
			orders.addTo(tree, tree.obj.rootId);
		}

		function addProcessClasses(tree) {
			var node = new Node();

			node.onClick = function() {
				console.log("Loading pclass");
			}

			node.init(true, "Process Classes");
			node.addTo(tree, tree.obj.rootId);
		}

		function addSchedules(tree) {
			function schedule (binder) {
				var node = new DataNode(binder, { name: true });

				node.onClick = function() {
					console.log("loadInterface: ", binder.id);
				}


				node.receive = function (data) {
					node.setVisible(true);
					node.tree.obj.setItemText(node.obj.id, data.name);
				}

				node.init(true, "");
				return node;
			}

			var target = 'schedule';
			var binder = new StandaloneBinder(target);
			var schedules = new CollectionNode(target, binder, schedule, { name: true });

			schedules.onClick = function() {
				joe.view.load('views/schedules', binder);
			}

			schedules.init(false, "Schedules");
			schedules.addTo(tree, tree.obj.rootId);
		}

		function addLocks(tree) {
			var node = new Node();

			node.onClick = function() {
				console.log("Loading locks");
			}

			node.init(true, "Locks");
			node.addTo(tree, tree.obj.rootId);
		}

		function addProcessings(tree) {
			var node = new Node();

			node.onClick = function() {
				console.log("Loading Pre-/Post-Processing");
			}

			node.init(true, "Pre-/Post-Processing");
			node.addTo(tree, tree.obj.rootId);
		}


		function build(tree) {
			addJobs(tree);
			addChains(tree);
			addOrders(tree);
			addProcessClasses(tree);
			addSchedules(tree);
			addLocks(tree);

			tree.obj.openItem(tree.obj.rootId);
			/*
			 * Where is the monitors tag ?
			 addProcessings(tree);
			*/
		}

		return build;
	})();

	joe.loader.finished(buildTree);
});
});
