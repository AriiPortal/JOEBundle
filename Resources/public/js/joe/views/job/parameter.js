'use strict';

joe.loader.load('utils/binder/entity_binder', function (EntityBinder) {
	joe.loader.load('templates/form_entity_adder', function (FormEntityAdder) {
		joe.loader.load('templates/parameter', function (parameter) {
			joe.loader.load('templates/includes', function (includes) {

				function environment(binder) {
					var rowDesc = [{ name: 'name', label: 'Name' }, { name: 'value', label: 'Value' }];

					var formDesc = [{ type: 'input', name: 'name', label: 'Name', inputWidth: 150 }, { type: 'newcolumn' }, { type: 'input', name: 'value', label: 'Value', inputWidth: 150 }];

					var ctrlsDesc = [{ label: 'Apply', action: applyParam }, { label: 'New', action: newParam }, { label: 'Remove', action: removeParam }];

					var editMode = false;

					function dataToForm(form, data) {
						var name = '';
						var value = '';

						if (data) {
							name = data.name;
							value = data.value;
						}

						form.setItemValue('name', name);
						form.setItemValue('value', value);

						editMode = true;
					}

					function formToData(form) {
						return {
							name: form.getItemValue('name'),
							value: form.getItemValue('value')
						};
					}

					function applyParam(adder) {
						if (editMode) {
							adder.update();
						} else {
							adder.create();
						}
					}

					function newParam(adder) {
						adder.enableForm();
						editMode = false;
					}

					function removeParam(adder) {
						adder.remove();
					}

					var view = new FormEntityAdder('variable', rowDesc, dataToForm, formToData, formDesc, ctrlsDesc, binder);
					return view;
				}

				var build = function build(binder) {
					var view = new View();

					view.setup = function (parent) {
						var tabbar = parent.attachTabbar();
						tabbar.addTab('parameter', 'Parameter');
						tabbar.addTab('environment', 'Environment');
						tabbar.addTab('includes', 'Includes');

						var tabParameter = tabbar.tabs('parameter');
						var tabEnvironment = tabbar.tabs('environment');
						var tabIncludes = tabbar.tabs('includes');

						tabParameter.setActive();

						var binderParameter = new EntityBinder('param', binder, 'params.paramCollection');
						var viewParameter = parameter(binderParameter);
						viewParameter.setup(tabParameter);
						viewParameter.init();

						var binderEnvironment = new EntityBinder('variable', binder, 'environmentVariables');
						var viewEnvironment = environment(binderEnvironment);
						viewEnvironment.setup(tabEnvironment);
						viewEnvironment.init();

						var binderIncludes = new EntityBinder('includeFile', binder, 'params.includes');
						var viewIncludes = includes(binderIncludes);
						viewIncludes.setup(tabIncludes);
						viewIncludes.init();

						view.destroy = function () {
							viewParameter.destroy();
							viewEnvironment.destroy();
							viewIncludes.destroy();

							binderParameter.destroy();
							binderEnvironment.destroy();
							binderIncludes.destroy();
						};
					};

					return view;
				};

				joe.loader.finished(build);
			});
		});
	});
});