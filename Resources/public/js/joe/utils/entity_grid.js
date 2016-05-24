'use strict';

var EntityGrid = function () {

	function onInit(data) {
		this.grid.clearAll();

		for (var key in data) {
			this.addRow(data[key]);
		}
	}

	function onUpdate(id, data) {
		this.updateRow(id, data.data);
	}

	function onCreate(data) {
		this.addRow(data);
	}

	function onRemove(data) {
		this.removeRow(data.data.id);
	}

	function EntityGrid(target, grid, rowDesc, binder) {
		this.target = target;
		this.route = joe.routes.api(target);
		this.grid = grid;
		this.rowDesc = rowDesc;
		this.entities = {};
		this.binder = binder;

		grid.attachEvent('onRowSelect', function (rid, ind) {
			this.onClick(this.binder.getData(rid));
		}.bind(this));

		grid.attachEvent('onRowDblClicked', function (rid, ind) {
			this.onDoubleClick(this.binder.getData(rid));
		}.bind(this));

		var header = this.rowDesc.map(function (x) {
			return x.label;
		}).join(', ');
		this.grid.setHeader(header);

		for (var i = 0; i < this.rowDesc.length; i++) {
			if (this.rowDesc[i].hasOwnProperty('visible') && !this.rowDesc[i].visible) {
				this.grid.setColumnHidden(i, true);
			}
		}

		this.grid.init();

		var callbacks = {
			onInit: onInit.bind(this),
			onUpdate: onUpdate.bind(this),
			onCreate: onCreate.bind(this),
			onRemove: onRemove.bind(this)
		};

		this.binder.register(this, callbacks, this.selector());
	}

	EntityGrid.prototype = {};

	/* ===== EVENTS ===== */
	EntityGrid.prototype.onClick = function (data) {};

	EntityGrid.prototype.onDoubleClick = function (data) {};
	/* ================== */

	function dataVal(name, data) {
		var path = name.split('.');
		var ptr = data;
		var i;
		for (i = 0; i < path.length - 1; i++) {
			ptr = ptr[path[i]];
		}return ptr[path[i]];
	}

	/* ===== INTERNALS ===== */

	EntityGrid.prototype.dataToRow = function (data) {
		return this.rowDesc.map(function (x) {
			if (x.hasOwnProperty('fromData')) {
				return x.fromData(data);
			} else {
				var val = dataVal(x.name, data);

				if (x.hasOwnProperty('format')) val = x.format(val);
				return val;
			}
		});
	};

	EntityGrid.prototype.addRow = function (data) {
		var rowData = this.dataToRow(data.data);
		this.grid.addRow(data.data.id, rowData, 0);
	};

	EntityGrid.prototype.updateRow = function (rid, data) {
		var rowData = this.dataToRow(data);

		for (var i = 0; i < this.rowDesc.length; i++) {
			this.grid.cells(rid, i).setValue(rowData[i]);
		}
	};

	EntityGrid.prototype.removeRow = function (id) {
		this.grid.deleteRow(id);
	};

	function selectField(field, selector) {
		var path = field.split('.');
		var ptr = selector;
		var j;

		for (j = 0; j < path.length - 1; j++) {
			if (ptr.hasOwnProperty(path[j])) {
				if (ptr[path[j]] === true) return;
			} else {
				ptr[path[j]] = {};
			}

			ptr = ptr[path[j]];
		}

		ptr[path[j]] = true;
	}

	EntityGrid.prototype.selector = function () {
		var selector = {};

		selector.id = true;

		for (var i = 0; i < this.rowDesc.length; i++) {
			var desc = this.rowDesc[i];
			if (desc.hasOwnProperty('select')) desc.select.map(function (x) {
				return selectField(x, selector);
			});else selectField(desc.name, selector);
		}
		return selector;
	};

	/* ===== ACTIONS ===== */
	EntityGrid.prototype.create = function (diff, callback) {
		this.binder.create(diff, callback);
	};

	EntityGrid.prototype.update = function (id, diff, callback) {
		this.binder.getData(id).binder.update(diff, callback);
		this.updateRow(id, diff);
	};

	EntityGrid.prototype.destroy = function () {
		this.binder.unregister(this);
	};

	EntityGrid.prototype.remove = function (id, callback) {
		this.binder.remove(id, callback);
	};
	/* =================== */

	return EntityGrid;
}();

joe.loader.finished(EntityGrid);