joe.loader.load('templates/form_entity_adder', function (FormEntityAdder) {
joe.loader.load('utils/binder/entity_binder', function (EntityBinder) {
	var rowDesc = [
		{ name: 'file', label: 'File', fromData: (obj => obj.file
													 ? obj.file
													 : obj.liveFile)
		},
		{ name: 'node', label: 'Node' }
	];

	var formDesc = [
		{ type: 'checkbox', name: 'isLive', label: 'from Hot Folder' },
		{ type: 'newcolumn' },
		{ type: 'input', name: 'file', label: '', inputWidth: 150 },
		{ type: 'newcolumn' },
		{ type: 'input', name: 'node', label: 'Node', inputWidth: 150 }
	];	

	var ctrlsDesc = [
		{ label: 'Apply', action: applyFile },
		{ label: 'New', action: newFile },
		{ label: 'Remove', action: removeFile }
	];

	var editMode = false;

	function dataToForm(form, data)
	{
		var file = '';
		var isLive = false;
		var node = ''

		if (data)
		{
			file = data.file
				 ? data.file
				 : data.liveFile;
			isLive = data.file != null;
			node = data.node;
		}

		form.setItemValue('file', file);
		form.setItemValue('node', node);

		var func = isLive
				 ? form.enableItem
				 : form.disableItem;

		func.call(form, 'isLive');
		
		editMode = true;
	}

	function formToData(form)
	{
		var file = form.getItemValue('file');
		var isLive = form.isItemChecked('isLive');
		
		return {
			file: (isLive ? null : file),
			liveFile: (isLive ? file : null),
			node: form.getItemValue('node')
		}
	}

	function applyFile(adder)
	{
		if (editMode)
		{
			adder.update();
		}
		else
		{
			adder.create();
		}
	}

	function newFile(adder)
	{
		adder.enableForm();
		editMode = false;
	}

	function removeFile(adder)
	{
		adder.remove();
	}

	var build = function (binder) {
		var view = new FormEntityAdder('includeFile', rowDesc, dataToForm, formToData, formDesc, ctrlsDesc, binder);
		return view;
	};

	joe.loader.finished(build);
});
});
