'use strict';

joe.loader.load('templates/form_entity_adder', function (FormEntityAdder) {
	joe.loader.load('utils/binder/entity_binder', function (EntityBinder) {
		var rowDesc = [{ name: 'lock', label: 'Lock' }, { name: 'exclusive', label: 'Exclusive', format: function format(x) {
				return x ? 'yes' : 'no';
			} }];

		var formDesc = [{ type: 'combo', name: 'lock', label: 'Lock', labelWidth: 150, width: 140 }, { type: 'newcolumn' }, { type: 'checkbox', name: 'exclusive', label: 'Exclusive', labelWidth: 150 }];

		var ctrlsDesc = [{ label: 'Apply Lock Use', action: applyLock }, { label: 'New Lock Use', action: newLock }, { label: 'Remove Lock Use', action: removeLock }];

		var editMode = false;

		function dataToForm(form, data) {
			var lock = '';
			var exclusive = false;

			if (data) {
				lock = data.lock;
				exclusive = data.exclusive;
			}

			form.getCombo('lock').setComboText(lock);
			form.getCombo('lock').setComboValue(lock);

			var func = exclusive ? form.checkItem : form.uncheckItem;
			func.call(form, 'exclusive');

			editMode = true;
		}

		function formToData(form) {
			return {
				lock: form.getItemValue('lock'),
				exclusive: form.isItemChecked('exclusive')
			};
		}

		function applyLock(adder) {
			if (editMode) {
				adder.update();
			} else {
				adder.create();
			}
		}

		function newLock(adder) {
			adder.enableForm();
			editMode = false;
		}

		function removeLock(adder) {
			adder.remove();
		}

		var build = function build(binder) {
			var binder = new EntityBinder('lockUse', binder, 'lockUses');
			var view = new FormEntityAdder('lockUse', rowDesc, dataToForm, formToData, formDesc, ctrlsDesc, binder);
			view.destroy = function () {
				binder.destroy();
			};
			return view;
		};

		joe.loader.finished(build);
	});
});