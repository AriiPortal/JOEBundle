'use strict';

joe.loader.load('utils/binder/entity_binder', function (EntityBinder) {
	joe.loader.load('templates/form_entity_adder', function (FormEntityAdder) {
		joe.loader.load('templates/parameter', function (parameter) {
			joe.loader.load('templates/includes', function (includes) {
				var build = function build(fetcher) {
					var view = new View();

					view.setup = function (parent) {
						var tabbar = parent.attachTabbar();
						tabbar.addTab('parameter', 'Parameter');
						tabbar.addTab('includes', 'Includes');

						var tabParameter = tabbar.tabs('parameter');
						var tabIncludes = tabbar.tabs('includes');

						tabParameter.setActive();

						var binderParameter = new EntityBinder(fetcher, 'params.paramCollection');
						var viewParameter = parameter(binderParameter);
						viewParameter.setup(tabParameter);
						viewParameter.init();

						var binderIncludes = new EntityBinder(fetcher, 'params.includes');
						var viewIncludes = includes(binderIncludes);
						viewIncludes.setup(tabIncludes);
						viewIncludes.init();

						view.destroy = function () {
							viewParameter.destroy();
							viewIncludes.destroy();

							binderParameter.destroy();
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