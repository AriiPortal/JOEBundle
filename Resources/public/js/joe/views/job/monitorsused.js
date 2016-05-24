'use strict';

joe.loader.load('templates/form_entity_adder', function (FormEntityAdder) {
	joe.loader.load('utils/binder/entity_binder', function (EntityBinder) {
		var rowDesc = [{ name: 'monitor', label: 'Monitor' }, { name: 'ordering', label: 'Ordering' }];

		var formDesc = [{ type: 'combo', name: 'monitor', label: 'Monitor', labelWidth: 150, width: 140 }, { type: 'newcolumn' }, { type: 'input', name: 'ordering', label: 'Odering', labelWidth: 150 }];

		var ctrlsDesc = [{ label: 'Apply Monitor Use', action: applyMonitor }, { label: 'New Monitor Use', action: newMonitor }, { label: 'Remove Monitor Use', action: removeMonitor }];

		var editMode = false;

		function dataToForm(form, data) {
			var monitor = '';
			var ordering = '';

			if (data) {
				monitor = data.monitor;
				ordering = data.ordering;
			}

			form.getCombo('monitor').setComboText(monitor);
			form.getCombo('monitor').setComboValue(monitor);
			form.setItemValue('ordering', ordering);

			editMode = true;
		}

		function formToData(form) {
			return {
				monitor: form.getItemValue('monitor'),
				ordering: form.getItemValue('ordering')
			};
		}

		function applyMonitor(adder) {
			if (editMode) {
				adder.update();
			} else {
				adder.create();
			}
		}

		function newMonitor(adder) {
			adder.enableForm();
			editMode = false;
		}

		function removeMonitor(adder) {
			adder.remove();
		}

		var build = function build(binder) {
			var binder = new EntityBinder('monitor', binder, 'monitorUses');
			var view = new FormEntityAdder('monitorUse', rowDesc, dataToForm, formToData, formDesc, ctrlsDesc, binder);
			view.destroy = function () {
				binder.destroy();
			};
			return view;
		};

		joe.loader.finished(build);
	});
});