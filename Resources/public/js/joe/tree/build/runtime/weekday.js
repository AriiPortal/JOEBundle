'use strict';

joe.loader.load('utils/binder/entity_binder', function (EntityBinder) {

	function WeekdayNode(binder, root) {
		this.binder = binder;
		this.children = {};
		var direct = false;
		var path = 'weekdays';

		if (root)
		{
			direct = true;
			path = root + '.' + path;
		}

		var setupWeekday = function (bind) {
			this.daysBinder = new EntityBinder('weekday', bind, path);

			if (this.onBinder) this.onBinder();
		}.bind(this);

		if (!direct) {
			var weekdayCbs = {
				onInit: function (data) {
					this.weekdayData = null;
					for (var key in data) {
						this.weekdayData = data[key];
						break;
					}

					if (this.weekdayData == null) this.binder.create({});else setupWeekday(this.weekdayData.binder);
				}.bind(this),
				onCreate: function onCreate(data) {
					if (this.weekdayData == null) {
						this.weekdayData = data;
						setupWeekday(this.weekdayData.binder);
					}
				}.bind(this)
			};

			this.binder.register(this, weekdayCbs, { days: true });
		}
		else
		{
			setupWeekday(binder);
		}
	}

	WeekdayNode.prototype = new Node();

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

	function whichToString(id) {
		var which = ["Second", "Third", "Fourth"];
		if (id == 1) return 'First';else if (id == -1) return 'Last';else {
			var str = which[Math.abs(id) - 2];
			if (id < 0) str += ' Last';
			return str;
		}
	}

	function dayToString(day) {
		return day.day + '.' + whichToString(day.which);
	}

	WeekdayNode.prototype._refresh = function () {
		if (this.tree.obj.getOpenState(this.obj.id) == 1 || this.shouldOpen == true) {
			this.tree.obj.closeItem(this.obj.id);
			this.tree.obj.openItem(this.obj.id);
			delete this.shouldOpen;
		}
	};

	WeekdayNode.prototype._addChild = function (wrapper) {
		var node = new Node();
		node.init(true, dayToString(wrapper.data));
		node.onClick = function () {
			joe.view.load('templates/runtime/periods', wrapper.binder);
		};
		node.addTo(this.tree, this.obj.id);
		this.children[wrapper.data.id] = node;
	};

	WeekdayNode.prototype._removeChild = function (wrapper) {
		var node = this.children[wrapper.data.id];
		if (node) {
			node.destroy();
			delete this.children[wrapper.data.id];
		}
	};

	WeekdayNode.prototype._updateChild = function (id, wrapper) {
		var node = this.children[id];
		if (node) {
			this.tree.obj.setItemText(node.obj.id, dayToString(wrapper.data));
		}
	};

	WeekdayNode.prototype._setupBinder = function () {
		var callbacks = {
			onInit: onInit.bind(this),
			onUpdate: onUpdate.bind(this),
			onCreate: onCreate.bind(this),
			onRemove: onRemove.bind(this)
		};

		this.daysBinder.register(this, callbacks, { day: true });
	};

	WeekdayNode.prototype.loadChildren = function (callback) {
		if (this.daysBinder) this._setupBinder();else this.onBinder = function () {
			this._setupBinder();
		};

		callback();
	};

	WeekdayNode.prototype.onClick = function () {
		if (this.daysBinder) {
			joe.view.load('templates/runtime/weekday', this.daysBinder);
		}
	};

	WeekdayNode.prototype.destroy = function () {
		Node.prototype.destroy.call(this);
		this.binder.unregister(this);

		if (this.daysBinder) {
			this.daysBinder.unregister(this);
			this.daysBinder.destroy();
		}
	};

	joe.loader.finished(WeekdayNode);
});
