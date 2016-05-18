joe.loader.load('templates/form_entity_adder', function (FormEntityAdder) {
joe.loader.load('utils/binder/entity_binder', function (EntityBinder) {
	var rowDesc = [
		{ name: 'name', label: 'Name' },
		{ name: 'value', label: 'Value' }
	];

	var formDesc = [
		{ type: 'input', name: 'name', label: 'Name', inputWidth: 150 },
		{ type: 'newcolumn' },
		{ type: 'input', name: 'value', label: 'Value', inputWidth: 150 }
	];	

	var ctrlsDesc = [
		{ label: 'Apply', action: applyParam },
		{ label: 'New', action: newParam },
		{ label: 'Remove', action: removeParam }
	];

	var editMode = false;

	function dataToForm(form, data)
	{
		var name = '';
		var value = '';

		if (data)
		{
			name = data.name;
			value = data.value;
		}

		form.setItemValue('name', name);
		form.setItemValue('value', value);

		editMode = true;
	}

	function formToData(form)
	{
		return {
			name: form.getItemValue('name'),
			value: form.getItemValue('value')
		}
	}

	function applyParam(adder)
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

	function newParam(adder)
	{
		adder.enableForm();
		editMode = false;
	}

	function removeParam(adder)
	{
		adder.remove();
	}

	var build = function (binder) {
		var view = new FormEntityAdder('param', rowDesc, dataToForm, formToData, formDesc, ctrlsDesc, binder);
		return view;
	};

	joe.loader.finished(build);
});
});
