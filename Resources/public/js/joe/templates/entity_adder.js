/*
 * EntityAdder:
 * UI Facility to create new entity and display them on a grid
 */
EntityAdder = (function() {
	function EntityAdder(target, rowDesc, controlDesc) {
		this.route = joe.routes.api(target);

		this.rowDesc = rowDesc;
		this.controlDesc = controlDesc;
		this.entities = {};
	}

	EntityAdder.prototype = new View();

	/* ===== EVENTS ===== */

	/* onAdd is called when a new entity is added */
	EntityAdder.prototype.onCreate = function(data) {

	}
	/* onRemove is called when an entity is removed */
	EntityAdder.prototype.onRemove = function(data) {

	}

	/* onSelect is called when an entity is selected (double clicked) */
	EntityAdder.prototype.onSelect = function(data) {

	}

	/* onControl is called when a control button is clicked */
	EntityAdder.prototype.onControl = function(id) {

	}

	/* ================= */

	function descToSelector(desc) {
		var selector = {};

		selector.id = true;

		for (var i = 0; i < desc.length; i++)
		{
			var path = desc[i].name.split('.');
			var ptr = selector;
			var j;
			for(j = 0; j < path.length - 1; j++)
			{
				ptr[path[j]] = {};
				ptr = ptr[path[j]];
			}

			ptr[path[j]] = true;
		}
		return selector;
	}

	function dataVal(name, data) {
		var path = name.split('.');
		var ptr = data;
		var i;
		for (i = 0; i < path.length - 1; i++)
			ptr = ptr[path[i]];
		return ptr[path[i]];
	}

	function fetch(adder) {
		var url = adder.route.list;
		var selector = descToSelector(adder.rowDesc);
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.send(JSON.stringify(selector));

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4)
			{
				if (xhr.status == 200)
				{
					var data = JSON.parse(xhr.responseText);
					for (var i = 0; i < data.length; i++)
						this.add(data[i]);
				}
				else
				{
					console.error("Could not delete entity: "
								  + xhr.responseText);
				}
			}
		}.bind(adder);
	}

	/* ===== ACTIONS ===== */

	EntityAdder.prototype.setup = function(parent) {
		var adderLayout = parent.attachLayout('2U');
		var left = adderLayout.cells('a');

		left.hideHeader();

		this.grid = left.attachGrid();
		this.grid.setImagePath( "/bundles/ariicore/images/treegrid/");
		var header = "Id, " + this.rowDesc.map(x => x.label).join(', ');
		this.grid.setHeader(header);
		this.grid.init();
		this.grid.setColumnHidden(0, true);

		var right = adderLayout.cells('b');
		right.hideHeader();
		right.setWidth('280');
		right.fixSize(1,0);

		this.control = right.attachForm(this.controlDesc);

		this.control.attachEvent('onButtonClick', function (id) {
			this.onControl(id);
		}.bind(this));

		this.grid.attachEvent('onRowDblClicked', function (rid, cid) {
			var e = this.entities[rid];
			this.onSelect(e);
		}.bind(this));

		fetch(this);
	}

	EntityAdder.prototype.create = function(data, callback) {
		var url = this.route.create;

		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.responseType = 'json';
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4)
			{
				if (xhr.status == 200)
				{
					this.add(xhr.response);
					this.onCreate(xhr.response);
				}
				else
				{
					console.error("Could not add entity: "
								  + xhr.response);
				}
			}
		}.bind(this);
		xhr.send(JSON.stringify(data));
	}

	EntityAdder.prototype.add = function(data) {
		var rowData = [data.id].concat(this.rowDesc.map(function (x) {
			var val = dataVal(x.name, data);
			if (x.hasOwnProperty('format'))
				val = x.format(val);
			return val;
		}));

		var rid = this.grid.getRowsNum() + 1;
		this.grid.addRow(rid, rowData, 0);
		this.entities[rid] = data;
	}

	EntityAdder.prototype.removeSelected = function() {
		var rid = this.grid.getSelectedRowId();
		if (rid == null)
		{
			return;
		}

		var e = this.entities[rid];
		var url = this.route.select(e.id).remove;

		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.send();

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4)
			{
				if (xhr.status == 200)
				{
					this.grid.deleteRow(rid)
					this.onRemove(this.entities[rid]);
					delete this.entities[rid];
				}
				else
				{
					console.error("Could not delete entity: "
								  + xhr.responseText);
				}
			}
		}.bind(this);
	}

	/* =================== */

	return EntityAdder;
})();

joe.loader.finished();
