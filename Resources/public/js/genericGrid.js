function dataToRow(rowSpec, item)
{
	return [item.id].concat(rowSpec.map(
		x => x.hasOwnProperty('callback')
		 ? x.callback(item)
		 : item[x.name]
	));
}

function setupGrid(grid, rowSpec)
{
	var header = 'Id,' + rowSpec.map(x => x.label).join(',');
	grid.setHeader(header);

	grid.setColumnHidden(0, true);
	for (var i = 0; i < rowSpec.length; ++i)
	{
		if (rowSpec[i].hasOwnProperty('visible') &&
			!rowSpec[i].visible)
		{
			grid.setColumnHidden(i+1, true);
		}
	}

	grid.init();
}

function post(target, request, callback)
{
	var xhr = new XMLHttpRequest();
	xhr.open("POST", target, true);
	xhr.setRequestHeader('Content-Type',
						 'application/json; charset=UTF-8');
	xhr.onreadystatechange = function () {
		if  (xhr.readyState == 4 && xhr.status == 200 && callback)
		{
			callback(xhr.responseText);
		}
	}
	xhr.send(request);
}

function genericGrid(parent, data, rowSpec, formDesc, entityDesc, formToDiff, dataToForm)
{
	var layout = parent.attachLayout('3J');
	var inputCell = layout.cells('a');
	var controlCell = layout.cells('b');
	var gridCell = layout.cells('c');

	inputCell.hideHeader();
	controlCell.hideHeader();
	gridCell.hideHeader();

	inputCell.fixSize(false, true);
	controlCell.setWidth(150);
	controlCell.fixSize(true, false);
	
	var controlDesc = [
		{ type:"button", name:"apply", value:"Apply", width: 140 },
		{ type:"button", name:"new", value:"New", width: 140 },
		{ type:"button", name:"remove", value:"Remove", width: 140 }
	];

	var inputForm = inputCell.attachForm(formDesc);
	var controlForm = controlCell.attachForm(controlDesc);
	var grid = gridCell.attachGrid();

	var map = {};

	var editMode = false;
	var newMode = false;
	var entityId;

	if (data == null)
	{
		data = [];
	}
	
	function addRow(item)
	{
		var id = grid.getRowsNum() + 1;
		grid.addRow(id, dataToRow(rowSpec, item));
		map[id] = item;
	}

	function rmRow(rid)
	{
		var item = map[rid];
		var url = apiRoutes(entityDesc.child, item.id).remove;

		post(url, '', function () {
			grid.deleteRow(rid);
			delete map.item;
		});
	}

	function updateRow(data)
	{
		var rid = Object.keys(map).find(function (key) {
			return map[key].id == data.id;
		});
		for (var i = 0 ; i < rowSpec.length ; ++i)
		{
			grid.cells(rid, i + 1).setValue(rowSpec[i].hasOwnProperty('callback')
										  ? rowSpec[i].callback(data)
										  : data[rowSpec[i].name]
			);
		}
		map[rid] = data;
	}
	
	function refresh()
	{
		var func = editMode || newMode ? inputForm.enableItem : inputForm.disableItem;
		formDesc.map(x => func.call(inputForm, x.name));

		if (editMode || newMode)
		{
			controlForm.enableItem('apply');
		}
		else
		{
			controlForm.disableItem('apply');
		}

		if (editMode)
		{
			controlForm.enableItem('remove');
		}
		else
		{
			controlForm.disableItem('remove');
		}
	}
	
	setupGrid(grid, rowSpec);
	data.map(addRow);
	refresh();
	
	grid.attachEvent('onRowSelect', function (rid, ind) {
		data = map[rid];
		dataToForm(inputForm, data);
		entityId = data.id;
		editMode = true;
		newMode = false;
		refresh();
	});
	
	controlForm.attachEvent('onButtonClick', function (name) {
		switch (name) {
			case 'apply':
				var diff = formToDiff(inputForm);
				if (newMode)
				{
					var url = apiRoutes(entityDesc.child).create
					post(url, JSON.stringify(diff), function (data) {
						var json = JSON.parse(data);
						var url = apiRoutes(entityDesc.parent.entity, entityDesc.parent.id).update;
						var request = {}
						var ptr = request;
						var path = (entityDesc.parent.name + ":+").split('.')
						path.slice(0, -1).map(function (x, i) {
							ptr[path[i]] = {};
							ptr = ptr[path[i]];
						});
						var last = path.slice(path.length - 1)[0];
						ptr[last] = json.id;
						console.log(request);
						addRow(json);
						post(url, JSON.stringify(request), function () {
							newMode = false;
							dataToForm(inputForm, null);
							refresh();
						});
					});
				}
				else if (editMode)
				{
					var url = apiRoutes(entityDesc.child, entityId).update;
					post(url, JSON.stringify(diff), function (data) {
						var json = JSON.parse(data);
						updateRow(json);
						editMode = false;
						dataToForm(inputForm, null);
						refresh();
					});
				}
				break;

			case 'new':
				dataToForm(inputForm, null);
				editMode = false;
				newMode = true;
				refresh();
				break;

			case 'remove':
				rmRow(grid.getSelectedRowId());
				editMode = false;
				newMode = false;
				dataToForm(inputForm, null);
				refresh();
				break;
		}
	});
}
