'use strict';

joe.loader.load('utils/binder/entity_binder', function (EntityBinder) {

	function MonthdaysNode(binder) {
		this.binder = binder;
		this.children = {};

		var setupMonthdays = function (data) {
			this.daysBinder = new EntityBinder('day', data.binder, 'days');

			if (this.onBinder) this.onBinder();
		}.bind(this);

		var monthdaysCbs = {
			onInit: function (data) {
				this.monthdaysData = null;
				for (key in data) {
					this.monthdaysData = data[key];
					break;
				}

				if (this.monthdaysData == null) this.binder.create({});else setupMonthdays(this.monthdaysData);
			}.bind(this),
			onCreate: function onCreate(data) {
				if (this.monthdaysData == null) {
					this.monthdaysData = data;
					setupMonthdays(this.monthdaysData);
				}
			}
		};

		this.binder.register(this, monthdaysCbs, { days: true });
	}

	MonthdaysNode.prototype = new Node();

	function onInit(data) {
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
		if (day.length == 1) return toMonthdayName(day[0]);else return day.join(' ');
	}

	MonthdaysNode.prototype._refresh = function () {
		if (this.tree.obj.getOpenState(this.obj.id) == 1 || this.shouldOpen == true) {
			this.tree.obj.closeItem(this.obj.id);
			this.tree.obj.openItem(this.obj.id);
			delete this.shouldOpen;
		}
	};

	MonthdaysNode.prototype._addChild = function (wrapper) {
		var node = new Node();
		node.init(true, dayToString(wrapper.data.day));
		node.onClick = function () {
			joe.view.load('templates/runtime/periods', wrapper.binder);
		};
		node.addTo(this.tree, this.obj.id);
		this.children[wrapper.data.id] = node;
	};

	MonthdaysNode.prototype._removeChild = function (wrapper) {
		var node = this.children[wrapper.data.id];
		if (node) {
			node.destroy();
			delete this.children[wrapper.data.id];
		}
	};

	MonthdaysNode.prototype._updateChild = function (id, wrapper) {
		var node = this.children[id];
		if (node) {
			this.tree.obj.setItemText(node.obj.id, dayToString(wrapper.data.day));
		}
	};

	MonthdaysNode.prototype._setupBinder = function () {
		var callbacks = {
			onInit: onInit.bind(this),
			onUpdate: onUpdate.bind(this),
			onCreate: onCreate.bind(this),
			onRemove: onRemove.bind(this)
		};

		this.daysBinder.register(this, callbacks, { day: true });
	};

	MonthdaysNode.prototype.loadChildren = function (callback) {
		if (this.daysBinder) this._setupBinder();else this.onBinder = function () {
			this._setupBinder();
		};

		callback();
	};

	MonthdaysNode.prototype.onClick = function () {
		if (this.daysBinder) {
			joe.view.load('templates/runtime/monthdays', this.daysBinder);
		}
	};

	MonthdaysNode.prototype.destroy = function () {
		Node.prototype.destroy.call(this);
		this.binder.unregister(this);

		if (this.daysBinder) {
			this.daysBinder.unregister(this);
			this.daysBinder.destroy();
		}
	};

	joe.loader.finished(MonthdaysNode);
});