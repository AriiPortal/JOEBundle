function post(target, request, callback)
{
	var xhr = new XMLHttpRequest();
	xhr.open("POST", target, true);
	xhr.setRequestHeader('Content-Type',
						 'application/json; charset=UTF-8');
	xhr.responseType = 'json';
	xhr.onreadystatechange = function () {
		if  (xhr.readyState == 4 && xhr.status == 200 && callback)
		{
			callback(xhr.response);
		}
	}
	xhr.send(request);
}

function specificGrid(parent, formDesc, formToDiff, formatRow, entityDesc, data)
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
		{ type:"button", name:"add", value:"Add", width: 140 },
		{ type:"button", name:"remove", value:"Remove", width: 140 }
	];
	var controlForm = controlCell.attachForm(controlDesc);
	var inputForm = inputCell.attachForm(formDesc);
	var grid = gridCell.attachGrid();

	grid.setHeader('value');
	grid.init();	
	data.map(obj => grid.addRow(obj.id, [formatRow(obj)]));
	
	controlForm.attachEvent('onButtonClick', function(name) {
		switch (name) {
			case 'add':
				var target = apiRoutes(entityDesc.child.entity).create;
				var request = formToDiff(inputForm);
				post(target, JSON.stringify(request), function (obj) {
					if (entityDesc.parent.replaceCallback)
					{
						entityDesc.parent.replaceCallback(obj, function () {
							grid.addRow(obj.id, formatRow(obj))
						});
					}
					else
					{
						var target = apiRoutes(entityDesc.parent.entity
											 , entityDesc.parent.id).update;
						var request = {};
						var ptr = request;
						var path = (entityDesc.parent.path + ':+').split('.');
						path.slice(0, -1).map(function (attr, i) {
							ptr[attr] = {};
							ptr = ptr[attr];
						});
						ptr[path[path.length - 1]] = obj.id;
						post(target, JSON.stringify(request), function() {
							grid.addRow(obj.id, formatRow(obj));
						});
					}
				});				
				break;
				
			case 'remove':
				var id = grid.getSelectedRowId();
				var target = apiRoutes(entityDesc.child.entity, id).remove;
				post(target, '{}', function () {
					grid.deleteRow(grid.getSelectedRowId());
				});
		}
	});
}
