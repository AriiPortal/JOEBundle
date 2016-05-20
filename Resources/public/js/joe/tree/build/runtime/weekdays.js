joe.loader.load('utils/binder/entity_binder', function(EntityBinder) {

	function WeekdaysNode (binder) {
		this.binder = binder;
		this.children = {}
		this.weekdaysBinder = new EntityBinder('weekdays', binder,
											   'runtime.weekdaysCollection');

		var setupWeekdays = function(data) {
			this.daysBinder = new EntityBinder('day', data.binder, 'days');

			if (this.onBinder)
				this.onBinder();

		}.bind(this);

		var weekdaysCbs = {
			onInit: function(data) {
				this.weekdaysData = null;
				for (key in data)
				{
					this.weekdaysData = data[key];
					break;
				}

				if (this.weekdaysData == null)
					this.weekdaysBinder.create({});
				else
					setupWeekdays(this.weekdaysData)
			}.bind(this),
			onCreate: function(data) {
				if (this.weekdaysData == null)
				{
					this.weekdaysData = data;
					setupWeekdays(this.weekdaysData)
				}
			}
		};

		this.weekdaysBinder.register(this, weekdaysCbs, { days: true });
	}

	WeekdaysNode.prototype = new Node;

	function onInit(data) {
		for (var key in data)
			this._addChild(data[key]);
		this._refresh();
	}

	function onUpdate(id, data) {
		this._updateChild(id, data);
	}

	function onCreate(data) {
		this._addChild(data);
		this._refresh();
	}

	function onRemove(data) {
		this._removeChild(data)
		this._refresh();
	}

	function dayToString(day) {
		if (day.length == 1)
			return toDayName(day[0]);
		else if (day.length == 7)
			return 'Every Day';
		else
			return day.join(' ');
	}


	WeekdaysNode.prototype._refresh = function() {
		if (this.tree.obj.getOpenState(this.obj.id) == 1 ||
		   this.shouldOpen == true)
		{
			this.tree.obj.closeItem(this.obj.id);
			this.tree.obj.openItem(this.obj.id);
			delete this.shouldOpen;
		}
	}

	WeekdaysNode.prototype._addChild = function(wrapper) {
		var node = new Node;
		node.init(true, dayToString(wrapper.data.day));
		node.onClick = function() {
			joe.view.load('templates/runtime/periods', wrapper.binder);
		}
		node.addTo(this.tree, this.obj.id);
		this.children[wrapper.data.id] = node;
	}

	WeekdaysNode.prototype._removeChild = function(wrapper) {
		var node = this.children[wrapper.data.id];
		if (node) {
			node.destroy();
			delete this.children[wrapper.data.id];
		}
	}

	WeekdaysNode.prototype._updateChild = function(id, wrapper) {
		var node = this.children[id];
		if (node) {
			this.tree.obj.setItemText(node.obj.id, dayToString(wrapper.data.day));
		}
	}

	WeekdaysNode.prototype._setupBinder = function() {
		var callbacks = {
			onInit: onInit.bind(this),
			onUpdate: onUpdate.bind(this),
			onCreate: onCreate.bind(this),
			onRemove: onRemove.bind(this)
		};

		this.daysBinder.register(this, callbacks, { day : true });
	}

	WeekdaysNode.prototype.loadChildren = function(callback) {
		if (this.daysBinder)
			this._setupBinder();
		else
			this.onBinder = function() { this._setupBinder(); }

		callback();
	}

	WeekdaysNode.prototype.onClick = function() {
		if (this.daysBinder) {
			joe.view.load('templates/runtime/weekdays', this.daysBinder);
		}
	}

	WeekdaysNode.prototype.destroy = function() {
		Node.prototype.destroy.call(this);
		this.weekdays.unregister(this);
		this.weekdaysBinder.destroy();

		if (this.daysBinder)
		{
			this.daysBinder.unregister(this);
			this.daysBinder.destroy();
		}
	}

	joe.loader.finished(WeekdaysNode);
});
