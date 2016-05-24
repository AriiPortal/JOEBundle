"use strict";

/*
 * ControlTree:
 *
 * Handles the DHTMLX tree (callbacks, manipulation)
 */
var ControlTree = function () {

	function treeClick(id) {
		return this.nodes[id].onClick();
	}

	function treeOpen(id, state) {
		if (id == this.obj.rootId) return true;

		return this.nodes[id].onOpen(state);
	}

	function ControlTree(obj) {
		this.obj = obj;
		this.nodes = {};
		this.first = true;

		this.obj.openOnItemAdded(false);

		obj.attachEvent("onOpenStart", treeOpen.bind(this));
		obj.attachEvent("onClick", treeClick.bind(this));
	}

	function getNewId(tree) {
		if (!tree.hasOwnProperty('new_id')) tree.new_id = 1;

		return tree.new_id++;
	}

	ControlTree.prototype = {
		addNode: function addNode(node, parentId, label) {
			var id = getNewId(this);

			var item = this.obj.insertNewItem(parentId, id, label, 0, 0, 0, 0, "CHILD");
			this.nodes[id] = node;

			return item;
		},

		removeNode: function removeNode(node) {
			this.obj.deleteItem(node.obj.id, false);
			delete this.nodes[node.id];
		}
	};

	return ControlTree;
}();