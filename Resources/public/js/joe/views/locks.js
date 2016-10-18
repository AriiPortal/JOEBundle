'use strict';

joe.loader.load('templates/form_entity_adder', function (FormEntityAdder) {
	var rowDesc = [
		{ name: 'name', label: 'Lock' },
		{ name: 'maxNonExclusive', label: 'Max Non Exclusive', format: function format(x) {
			return x == null ? '' : x;
		} }
	];

	var formDesc = [
		{ type: 'combo', name: 'name', label: 'Lock', labelWidth: 150, width: 140 },
		{ type: 'block', list: [
			{ type: 'label', label: 'Max Non Exclusive' },
			{ type: 'checkbox', name: 'unlimited', label: 'unlimited' },
			{ type: 'newcolumn' },
			{ type: 'input', name: 'maxNonExclusive' }
		] }
	];

	var ctrlsDesc = [{ label: 'Apply Lock', action: apply }, { label: 'New Lock', action: init }, { label: 'Remove Lock', action: remove }];

	var editMode = false;

	function dataToForm(form, data) {
		var name = '';
		var unlimited = true;
		var maxNonExclusive = '0';

		if (data) {
			name = data.name;
			if (data.maxNonExclusive != null)
			{
				unlimited = false;
				maxNonExclusive = data.maxNonExclusive;
			}
		}

		form.setItemValue('name', name);
		form.setItemValue('maxNonExclusive', maxNonExclusive);

		var func = unlimited ? form.checkItem : form.uncheckItem;
		func.call(form, 'unlimited');

		editMode = true;
	}

	function formToData(form) {
		var maxNonExclusive = form.isItemChecked('unlimited')
							? null
							: form.getItemValue('maxNonExclusive');
		return {
			name: form.getItemValue('name'),
			maxNonExclusive: maxNonExclusive
		};
	}

	function apply(adder) {
		if (editMode) {
			adder.update();
		} else {
			adder.create();
		}
	}

	function init(adder) {
		adder.enableForm();
		editMode = false;
	}

	function remove(adder) {
		adder.remove();
	}

	var build = function build(binder) {
		var view = new FormEntityAdder('lock', rowDesc, dataToForm, formToData, formDesc, ctrlsDesc, binder);

		return view;
	};

	joe.loader.finished(build);
});
