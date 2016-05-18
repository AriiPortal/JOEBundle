joe.loader.load('templates/form_entity_adder', function (FormEntityAdder) {
joe.loader.load('utils/binder/entity_binder', function (EntityBinder) {
	var rowDesc = [
		{ name: 'delayCount', label: 'Error Count' },
		{ name: 'Delay [hh:mm:]ss', label: 'delay' },
	];

	var formDesc = [
		{ type: 'input', name: 'delayCount', label: 'Error Count' },
		{ type: 'newcolumn' },
		{ type: 'radio', name: 'isDelayed', label: 'Stop', value: 'stop' },
		{ type: 'newcolumn' },
		{ type: 'radio', name: 'isDelayed', label: 'Delay', value: 'delay' },
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
		return tt;
	}
	
	function mkDelay(hh, mm, ss)
	{
		return [mkTime(hh)
			  , mkTime(mm)
			  , mkTime(ss)].join(':');
	}
	
	function refresh(form)
	{
		var func;
		switch (form.getCheckedValue('isDelayed')) {
			case 'stop':
				func = form.disableItem;
				break;
			case 'delay':
				func = form.enableItem;
		}
		['hh', 'mm', 'ss'].map(
			x => func.call(form, x)
		);
	}
	
	function dataToForm(form, data)
	{
		var delayCount = '';
		var delay = splitDelay('00:00:00');
		var stop = false;
		
		if (data)
		{
			delayCount = data.delayCount;
			if (data.delay == 'stop')
			{
				stop = true;
			}
			else
			{
				delay = splitDelay(data.delay);
			}
		}

		form.setItemValue('delayCount', delayCount);
		form.setItemValue('hh', delay.hh);
		form.setItemValue('mm', delay.mm);
		form.setItemValue('ss', delay.ss);
		form.checkItem('isDelayed', stop ? 'stop' : 'delay');
		
		editMode = true;
	}

	function formToData(form)
	{
		var delay;
		switch (form.getCheckedValue('isDelayed')) {
			case 'stop':
				delay = 'stop';
				break;
			case 'delay':
				delay = mkDelay(form.getItemValue('hh')
							  , form.getItemValue('mm')
							  , form.getItemValue('ss')
				);
		}
		
		return {
			delayCount: form.getItemValue('delayCount'),
			delay: delay
		}
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
		var view = new FormEntityAdder('delayAfterError', rowDesc, dataToForm, formToData, formDesc, ctrlsDesc, binder, refresh);
		return view;
	};

	joe.loader.finished(build);
});
});
