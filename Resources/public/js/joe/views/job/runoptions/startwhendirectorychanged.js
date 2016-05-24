'use strict';

joe.loader.load('templates/form_entity_adder', function (FormEntityAdder) {
	joe.loader.load('utils/binder/entity_binder', function (EntityBinder) {
		var rowDesc = [{ name: 'directory', label: 'Directory' }, { name: 'regex', label: 'Regex' }];

		var formDesc = [{ type: 'input', name: 'directory', label: 'Watch Directory' }, { type: 'newcolumn' }, { type: 'input', name: 'regex', label: 'File Regex' }];

		var ctrlsDesc = [{ label: 'Apply Dir', action: applyDir }, { label: 'New Dir', action: newDir }, { label: 'Remove Dir', action: removeDir }];

		var editMode = false;

		function dataToForm(form, data) {
			var directory = '';
			var regex = '';

			if (data) {
				directory = data.directory;
				regex = data.regex;
			}

			form.setItemValue('directory', directory);
			form.setItemValue('regex', regex);

			editMode = true;
		}

		function formToData(form) {
			return {
				directory: form.getItemValue('directory'),
				regex: form.getItemValue('regex')
			};
		}

		function applyDir(adder) {
			if (editMode) {
				adder.update();
			} else {
				adder.create();
			}
		}

		function newDir(adder) {
			adder.enableForm();
			editMode = false;
		}

		function removeDir(adder) {
			adder.remove();
		}

		var build = function build(binder) {
			var view = new FormEntityAdder('startWhenDirectoryChanged', rowDesc, dataToForm, formToData, formDesc, ctrlsDesc, binder);
			return view;
		};

		joe.loader.finished(build);
	});
});