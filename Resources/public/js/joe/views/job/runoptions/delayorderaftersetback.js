joe.loader.load('templates/form_entity_adder', function (FormEntityAdder) {
joe.loader.load('utils/binder/entity_binder', function (EntityBinder) {
	var rowDesc = [
		{ name: 'setbackCount', label: 'Set Back Count' },
		{ name: 'delay', label: 'Delay [hh:mm:]ss' },
	];

	var formDesc = [
		{ type: 'input', name: 'setbackCount', label: 'Set Back Count' },
		{ type: 'newcolumn' },
		{ type: 'checkbox', name: 'isMaximum', label: 'Max' },
		{ type: 'newcolumn' },
		{ type: 'input', name: 'hh', label: '', width: '20' },
		{ type: 'newcolumn' },
		{ type: 'input', name: 'mm', label: ':', width: '20' },
		{ type: 'newcolumn' },
		{ type: 'input', name: 'ss', label: ':', width: '20' },
		{ type: 'newcolumn' },
		{ type: 'label', label: '[hh:mm:]ss' }
	];	

	var ctrlsDesc = [
		{ label: 'Apply Delay', action: applyDelay },
		{ label: 'New Delay', action: newDelay },
		{ label: 'Remove Delay', action: removeDelay }
	];

	var editMode = false;
	
	function splitDelay(delay)
	{
		var d = delay.split(':');

		switch (d.length) {
			case 1:
				return {
					hh: ''
					, mm: ''
					, ss: d[0]
				};
			case 2:
				return {
					hh: d[0]
					, mm: d[1]
					, ss: ''
				};
			case 3:
				return {
					hh: d[0]
					, mm: d[1]
					, ss: d[2]
				}
		}		
	}

	function mkTime(tt)
	{
		if (isNaN(parseInt(tt)))
		{
			return '00';
		}
		return parseInt(tt);
	}
	
	function mkDelay(hh, mm, ss)
	{
		return [mkTime(hh)
			  , mkTime(mm)
			  , mkTime(ss)].join(':');
	}
	
	function dataToForm(form, data)
	{
		var setbackCount = '';
		var delay = splitDelay('00:00:00');
		var isMaximum = false;
		
		if (data)
		{
			setbackCount = data.setbackCount;
			delay = splitDelay(data.delay);
			isMaximum = data.isMaximum
		}

		form.setItemValue('setbackCount', setbackCount);
		form.setItemValue('hh', delay.hh);
		form.setItemValue('mm', delay.mm);
		form.setItemValue('ss', delay.ss);

		var func = isMaximum
				 ? form.checkItem
				 : form.uncheckItem;

		func.call(form, 'isMaximum');
		
		editMode = true;
	}

	function formToData(form)
	{
		var delay = mkDelay(form.getItemValue('hh')
						  , form.getItemValue('mm')
						  , form.getItemValue('ss')
		);
		
		return {
			setbackCount: form.getItemValue('setbackCount'),
			delay: delay,
			isMaximum: form.isItemChecked('isMaximum')			
		};
	}

	function applyDelay(adder)
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

	function newDelay(adder)
	{
		adder.enableForm();
		editMode = false;
	}

	function removeDelay(adder)
	{
		adder.remove();
	}

	var build = function (binder) {
		var view = new FormEntityAdder('delayOrderAfterSetBack', rowDesc, dataToForm, formToData, formDesc, ctrlsDesc, binder);
		return view;
	};

	joe.loader.finished(build);
});
});
