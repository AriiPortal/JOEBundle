'use strict';

joe.loader.load('templates/script', function (script) {
	joe.loader.load('templates/includes', function (includes) {
		joe.loader.load('utils/binder/entity_binder', function (EntityBinder) {

			var languages = ['java', 'javascript', 'VBScript', 'perlScript', 'javax.script:rhino', 'javax.script:ecmascript', 'java:javascript'].map(function (lang) {
				return {
					label: lang,
					value: lang
				};
			});

			var desc = [{ type: 'block', list: [{ type: 'input', name: 'name', label: 'Name' }, { type: 'newcolumn' }, { type: 'input', name: 'ordering', label: 'Ordering' }] }, { type: 'combo', name: 'script.language', label: 'language', options: languages }];

			var fields = [{ name: 'name' }, { name: 'ordering' }, { name: 'script.language' }];

			var build = function build(binder) {
				var views = {};
				views.main = new View();

				views.main.setup = function (parent) {
					var layout = parent.attachLayout('2E');
					var top = layout.cells('a');
					var bottom = layout.cells('b');

					top.hideHeader();
					bottom.hideHeader();

					var tabs = bottom.attachTabbar();
					tabs.addTab('tabScript', 'Script');
					tabs.addTab('tabJava', 'Java');
					tabs.addTab('tabIncludes', 'Includes');
					var tabScript = tabs.tabs('tabScript');
					var tabJava = tabs.tabs('tabJava');
					var tabIncludes = tabs.tabs('tabIncludes');
					tabScript.setActive();

					var dhtmlxForm = top.attachForm(desc);
					dhtmlxForm.getCombo('script.language').readonly(true);
					views.main.form = new Form(dhtmlxForm, fields, binder);

					views.script = new script(binder);
					views.script.setup(tabScript);
					views.script.init();

					includesBinder = new EntityBinder('includeFile', binder, 'script.includes');
					views.includes = new includes(includesBinder);
					views.includes.setup(tabIncludes);
					views.includes.init();
				};

				views.main.destroy = function () {
					views.script.destroy();
					views.includes.destroy();
					includesBinder.destroy();
					views.main.form.destroy();
				};

				return views.main;
			};

			joe.loader.finished(build);
		});
	});
});