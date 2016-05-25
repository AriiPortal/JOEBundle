'use strict';

joe.loader.load('utils/binder/entity_binder', function (EntityBinder) {

	function UltimosNode(binder, root) {
		this.binder = binder;
		this.children = {};
		var direct = false;
		var path = 'dayCollection';

		if (root)
		{
			direct = true;
			path = root + '.' + path;
		}

		var setupUltimos = function (bind) {
			this.daysBinder = new EntityBinder('day', bind, path);

			if (this.onBinder) this.onBinder();
		}.bind(this);

		if (!direct)
		{
			var ultimosCbs = {
				onInit: function (data) {
					this.ultimosData = null;
					for (var key in data) {
						this.ultimosData = data[key];
						break;
					}

					if (this.ultimosData == null) this.binder.create({});else setupUltimos(this.ultimosData.binder);
				}.bind(this),
				onCreate: function onCreate(data) {
					if (this.ultimosData == null) {
						this.ultimosData = data;
						setupUltimos(this.ultimosData.binder);
					}
				}.bind(this)
			};

			this.binder.register(this, ultimosCbs, { dayCollection: true });
		}
		else
		{
			setupUltimos(binder);
		}
	}

	UltimosNode.prototype = new Node();

	function onInit(data) {
		this.tree.obj.deleteChildItems(this.obj.id);
		for (var key in data) {
			this._addChild(data[key]);
		}this._refresh();
	}

	function onUpdate(id, data) {
		this._updateChild(id, data);
	}

	function onCreate(data) {
		this._addChild(data);
		this._refresh();
	}

	function onRemove(data) {
		this._removeChild(data);
		this._refresh();
	}

	function dayToString(day) {
		if (day.length == 1) return spec.ultimos[day[0]];else return day.join(' ');
	}

	UltimosNode.prototype._refresh = function () {
		if (this.tree.obj.getOpenState(this.obj.id) == 1 || this.shouldOpen == true) {
			this.tree.obj.closeItem(this.obj.id);
			this.tree.obj.openItem(this.obj.id);
			delete this.shouldOpen;
		}
	};

	UltimosNode.prototype._addChild = function (wrapper) {
		var node = new Node();
		node.init(true, dayToString(wrapper.data.day));
		node.onClick = function () {
			joe.view.load('templates/runtime/periods', wrapper.binder);
		};
		node.addTo(this.tree, this.obj.id);
		this.children[wrapper.data.id] = node;
	};

	UltimosNode.prototype._removeChild = function (wrapper) {
		var node = this.children[wrapper.data.id];
		if (node) {
			node.destroy();
			delete this.children[wrapper.data.id];
		}
	};

	UltimosNode.prototype._updateChild = function (id, wrapper) {
		var node = this.children[id];
		if (node) {
			this.tree.obj.setItemText(node.obj.id, dayToString(wrapper.data.day));
		}
	};

	UltimosNode.prototype._setupBinder = function () {
		var callbacks = {
			onInit: onInit.bind(this),
			onUpdate: onUpdate.bind(this),
			onCreate: onCreate.bind(this),
			onRemove: onRemove.bind(this)
		};

		this.daysBinder.register(this, callbacks, { day: true });
	};

	UltimosNode.prototype.loadChildren = function (callback) {
		if (this.daysBinder) this._setupBinder();else this.onBinder = function () {
			this._setupBinder();
		};

		callback();
	};

	UltimosNode.prototype.onClick = function () {
		if (this.daysBinder) {
			joe.view.load('templates/runtime/ultimos', this.daysBinder);
		}
	};

	UltimosNode.prototype.destroy = function () {
		Node.prototype.destroy.call(this);
		this.binder.unregister(this);

		if (this.daysBinder) {
			this.daysBinder.unregister(this);
			this.daysBinder.destroy();
		}
	};

	joe.loader.finished(UltimosNode);
});
