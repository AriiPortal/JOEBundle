/*
 * DataNode:
 * A Node that uses a databinder
 */
var DataNode = (function() {

	function DataNode(binder, selector) {
		this.binder = binder;
		this.selector = selector;
	}

	DataNode.prototype = new Node();

	/* Called uppon receiving data from the binder */
	DataNode.prototype.receive = function(data) {
		/* This function should be rewritten by the calling node */
	};

	DataNode.prototype.postAdd = function() {
		var callbacks = {
			onInit: this.receive.bind(this),
			onUpdate: this.receive.bind(this)
		};

		this.binder.register(this, callbacks, this.selector);
	};

	DataNode.prototype.destroy = function() {
		Node.prototype.destroy.call(this);
		this.binder.unregister(this);
	};

	return DataNode;
})();
