/*
 * CollectionNode:
 * A node that expands in multiple nodes of the same type
 */
var CollectionNode = (function() {

	function onReset(data) {
		this.removeChildren();

		for (var key in data)
			this.addChild(data[key]);

		this.refresh();
	}

	function onCreate (data) {
		this.addChild(data);
		this.refresh();
	}

	function onRemove (data) {
		this.removeChild(data.data.id);
		this.refresh();
	}

	function CollectionNode(target, binder, builder, preselector) {
		this.target = target;
		this.binder = binder;
		this.builder = builder;
		this.children = {};
		this.preselector = preselector ? preselector : {};
		this.preselector.id = true;
	}

	CollectionNode.prototype = new Node();

	CollectionNode.prototype.addChild = function (data) {
		var node = this.builder(data.binder);
		this.children[data.data.id] = node;
		node.addTo(this.tree, this.obj.id);
	}

	CollectionNode.prototype.removeChild = function(id) {
		if (this.children.hasOwnProperty(id))
		{
			var node = this.children[id];
			node.destroy();
			delete this.children[id];
		}
	}

	CollectionNode.prototype.removeChildren = function() {
		for (var key in this.children)
		{
			this.removeChild(key);
		}
	}


	CollectionNode.prototype.refresh = function() {
		if (this.tree.obj.getOpenState(this.obj.id) == 1 ||
		   this.shouldOpen == true)
		{
			this.tree.obj.closeItem(this.obj.id);
			this.tree.obj.openItem(this.obj.id);
			delete this.shouldOpen;
		}
	}

	CollectionNode.prototype.loadChildren = function(callback) {
		var callbacks = {
			onInit: onReset.bind(this),
			onUpdate: onReset.bind(this),
			onCreate: onCreate.bind(this),
			onRemove: onRemove.bind(this)
		};

		this.binder.register(this, callbacks, {}, this.preselector);

		callback();
	}

	CollectionNode.prototype.destroy = function() {
		Node.prototype.destroy.call(this);
		this.binder.unregister(this);
	};

	return CollectionNode;
})();
