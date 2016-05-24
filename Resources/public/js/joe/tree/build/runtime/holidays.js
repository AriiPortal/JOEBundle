'use strict';

joe.loader.load('utils/binder/entity_binder', function (EntityBinder) {

	function HolidaysNode(binder) {
		this.binder = binder;
		this.children = {};
		this.holidaysBinder = new EntityBinder('holidays', binder, 'runtime.holidays');

		var setupHolidays = function (data) {
			this.daysBinder = new EntityBinder('day', data.binder, 'dayCollection');

			if (this.onBinder) this.onBinder();
		}.bind(this);

		var holidaysCbs = {
			onInit: function (data) {
				this.holidaysData = null;
				for (key in data) {
					this.holidaysData = data[key];
					break;
				}

				if (this.holidaysData == null) this.holidaysBinder.create({});else setupHolidays(this.holidaysData);
			}.bind(this),
			onCreate: function onCreate(data) {
				if (this.holidaysData == null) {
					this.holidaysData = data;
					setupHolidays(this.holidaysData);
				}
			}
		};

		this.holidaysBinder.register(this, holidaysCbs, { days: true });
	}

	HolidaysNode.prototype = new Node();

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
		if (day.length == 1) return spec.holidays[day[0]];else return day.join(' ');
	}

	HolidaysNode.prototype._refresh = function () {
		if (this.tree.obj.getOpenState(this.obj.id) == 1 || this.shouldOpen == true) {
			this.tree.obj.closeItem(this.obj.id);
			this.tree.obj.openItem(this.obj.id);
			delete this.shouldOpen;
		}
	};

	HolidaysNode.prototype._addChild = function (wrapper) {
		var node = new Node();
		node.init(true, dayToString(wrapper.data.day));
		node.onClick = function () {
			joe.view.load('templates/runtime/periods', wrapper.binder);
		};
		node.addTo(this.tree, this.obj.id);
		this.children[wrapper.data.id] = node;
	};

	HolidaysNode.prototype._removeChild = function (wrapper) {
		var node = this.children[wrapper.data.id];
		if (node) {
			node.destroy();
			delete this.children[wrapper.data.id];
		}
	};

	HolidaysNode.prototype._updateChild = function (id, wrapper) {
		var node = this.children[id];
		if (node) {
			this.tree.obj.setItemText(node.obj.id, dayToString(wrapper.data.day));
		}
	};

	HolidaysNode.prototype._setupBinder = function () {
		var callbacks = {
			onInit: onInit.bind(this),
			onUpdate: onUpdate.bind(this),
			onCreate: onCreate.bind(this),
			onRemove: onRemove.bind(this)
		};

		this.daysBinder.register(this, callbacks, { day: true });
	};

	HolidaysNode.prototype.loadChildren = function (callback) {
		if (this.daysBinder) this._setupBinder();else this.onBinder = function () {
			this._setupBinder();
		};

		callback();
	};

	HolidaysNode.prototype.onClick = function () {
		if (this.daysBinder) {
			joe.view.load('templates/runtime/holidays', this.daysBinder);
		}
	};

	HolidaysNode.prototype.destroy = function () {
		Node.prototype.destroy.call(this);
		this.holidays.unregister(this);
		this.holidaysBinder.destroy();

		if (this.daysBinder) {
			this.daysBinder.unregister(this);
			this.daysBinder.destroy();
		}
	};

	joe.loader.finished(HolidaysNode);
});