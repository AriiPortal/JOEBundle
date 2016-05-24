'use strict';

joe.loader.load('templates/form_entity_adder', function (FormEntityAdder) {

	var formDesc = [{ type: 'input', name: 'directory', label: 'Directory', labelWidth: 140 }, { type: 'input', name: 'regex', label: 'Regex', labelWidth: 140 }, { type: 'checkbox', name: 'alertWhenDirectoryMissing', label: 'Alert when directory missing', labelWidth: 140 }, { type: 'newcolumn' }, { type: 'input', name: 'delayAfterError', label: 'Delay After Error', labelWidth: 140 }, { type: 'input', name: 'repeat', label: 'Repeat', labelWidth: 140 }, { type: 'input', name: 'nextState', label: 'Next State', labelWidth: 140 }];

	var rowDesc = [{ name: 'directory', label: 'Directory' }, { name: 'regex', label: 'Regex' }, { name: 'nextState', label: 'Next State' }];

	var ctrlsDesc = [{ label: 'Apply File Order Source', action: apply }, { label: 'New File Order Source', action: initNew }, { label: 'Remove File Order Source', action: remove }];

	var editMode = false;

	function apply(adder) {
		if (editMode) adder.update();else adder.create();
	}

	function initNew(adder) {
		adder.enableForm();
		editMode = false;
	}

	function remove(adder) {
		adder.remove();
	}

	function dataToForm(form, data) {
		var value = {
			input: {
				directory: '',
				regex: '',
				delayAfterError: '',
				repeat: 10,
				nextState: ''
			},
			checkbox: {
				alertWhenDirectoryMissing: false
			}
		};

		if (data) {
			value.input.directory = data.directory;
			value.input.regex = data.regex ? data.regex : '';
			value.checkbox.alertWhenDirectoryMissing = data.alertWhenDirectoryMissing ? true : false;
			value.input.delayAfterError = data.delayAfterError ? data.delayAfterError : '';
			value.input.repeat = data.repeat;
			value.input.nextState = data.nextState;
		}

		for (var key in value.input) {
			form.setItemValue(key, value.input[key]);
		}

		if (value.checkbox.alertWhenDirectoryMissing) form.checkItem('alertWhenDirectoryMissing');else form.uncheckItem('alertWhenDirectoryMissing');

		editMode = true;
	}

	function formToData(form) {
		var delayAfterError = form.getItemValue('delayAfterError') == '' ? null : form.getItemValue('delayAfterError');

		var regex = form.getItemValue('regex') == '' ? null : form.getItemValue('regex');

		return {
			directory: form.getItemValue('directory'),
			regex: regex,
			delayAfterError: delayAfterError,
			repeat: form.getItemValue('repeat'),
			nextState: form.getItemValue('nextState'),
			alertWhenDirectoryMissing: form.getCheckedValue('alertWhenDirectoryMissing')
		};
	}

	var build = function build(binder) {
		var view = new FormEntityAdder('fileOrderSource', rowDesc, dataToForm, formToData, formDesc, ctrlsDesc, binder);

		return view;
	};

	joe.loader.finished(build);
});