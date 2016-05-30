'use strict';

joe.loader.load('utils/binder/entity_binder', function (EntityBinder) {


	function onChildInit(data) {
		this.removeChildren();

		for (var key in data) {
			this.addChild(data[key]);
		}
		this.refresh();
	}

	function onSelfInit(data) {
		this.removeChildren();

		for (var key in data) {
			this.addChild(data[key]);
		}
		this.refresh();
	}


	function onCreate(data) {
		this.addChild(data);
		this.refresh();
	}

	function onRemove(data) {
		this.removeChild(data.data.id);
		this.refresh();
	}

	function CommandNode(target, binder, builder, preselector) {
		this.target = target;
		this.binder = binder;
		this.children = {};
	}

	CommandNode.prototype = new Node();

	CommandNode.prototype.addChild = function (data) {
		var node = this.builder(data.binder);
		this.children[data.data.id] = node;
		node.addTo(this.tree, this.obj.id);
	};

	CommandNode.prototype.removeChild = function (id) {
		if (this.children.hasOwnProperty(id)) {
			var node = this.children[id];
			node.destroy();
			delete this.children[id];
		}
	};

	CommandNode.prototype.onClick = function () {
		joe.view.load('views/job/commands/main', this.binder);
	}

	CommandNode.prototype.removeChildren = function () {
		for (var key in this.children) {
			this.removeChild(key);
		}
	};

	CommandNode.prototype.refresh = function () {
		if (this.tree.obj.getOpenState(this.obj.id) == 1 || this.shouldOpen == true) {
			this.tree.obj.closeItem(this.obj.id);
			this.tree.obj.openItem(this.obj.id);
			delete this.shouldOpen;
		}
	};

	CommandNode.prototype.loadChildren = function (callback) {
		var callbacks = {
			onInit: onInit.bind(this),
			onCreate: onCreate.bind(this),
			onRemove: onRemove.bind(this)
		};

		this.binder.register(this, callbacks, {}, this.preselector);

		this.addjob_bind = new EntityBinder('addJobs', binder, 'addJobsCollection');
		this.addorder_bind = new EntityBinder('addOrder', binder, 'addOrderCollection');
		callback();
	};

	CommandNode.prototype.destroy = function () {
		Node.prototype.destroy.call(this);
		this.binder.unregister(this);
	};


	function build(binder) {
		var node = new DataNode(binder, selector);

		node.onClick = function () {

		};

		node.receive = function (data) {
			node.setVisible(true);
			node.tree.obj.setItemText(node.obj.id, data.onExitCode);
		};

		node.init(true, "");
		return node;
	}

	joe.loader.finished(CommandNode);
});
