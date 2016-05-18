/*
 * Node:
 *
 * Tree item node definition, handles events
 */
var Node = (function() {
	function Node() {
		this.initialized = false;
	}


	Node.prototype = {
		init: function(lazy, label) {
			this.label = label;
			this.lazy = lazy;
			this.initialized = true;
		},
		addTo: function(tree, parentId) {
			if (!this.initialized)
			{
				console.error("Trying to add uninitialized node...");
				return;
			}

			this.obj = tree.addNode(this, parentId, this.label);

			if (this.label == "")
			{
				this.setVisible(false);
			}

			this.tree = tree;

			if (this.loadChildren != null)
			{
				if (this.lazy)
				{
					/* Little hack to have a "directory" display */
					this.obj.childsCount = 1;
					tree.obj.closeItem(this.obj.id);

					/* We "patch" loadChildren to reset the childCount to 0
					   otherwise dhtmlx tiggers a bug
					*/
					var loadFunc = this.loadChildren;
					this.loadChildren = function(cb) {
					 	this.obj.childsCount = 0;
					 	loadFunc.call(this, cb);
					}.bind(this);

					var destroyFunc = this.destroy;
					this.destroy = function() {
						this.obj.childsCount = 0;
						destroyFunc.call(this)
					}.bind(this);
				}
				else
				{
					this.loadChildren(function() {
						this.loaded = true;
						this.tree.obj.closeItem(this.obj.id);
					}.bind(this));
				}
			}
			this.postAdd();
		},
		destroy: function() {
			this.tree.removeNode(this);
		},
		postAdd: function() {
		},
		setVisible: function(state) {
			var val = state ? '' : 'none';
			this.obj.span.parentNode.parentNode.style.display =  val;
		},
		onOpen: function(state) {
			if (this.loadChildren == null)
				return false;

			if (!this.hasOwnProperty('loaded'))
				this.loaded = false;

			if (!this.loaded)
			{
				this.loadChildren(function() {
					this.loaded = true;

					if (this.tree.obj.openItem(this.obj.id) == undefined)
						this.shouldOpen = true;
				}.bind(this));
				return false;
			}
			else
			{
				return true;
			}
		},
		onClick: function() {
		},
		loadChildren: null
	}

	return Node;
})();
