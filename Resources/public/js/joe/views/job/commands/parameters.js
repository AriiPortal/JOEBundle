'use strict';

(function () {
	function Parameter(binder) {
		this.binder = binder;
		this.views = {};
	}

	Parameter.prototype = new View();

	Parameter.prototype.setup = function (parent) {
		var tabbar = parent.attachTabbar();
		tabbar.addTab('tabParameter', 'Parameter');
		tabbar.addTab('tabEnvionment', 'Environment');
		tabbar.addTab('tabIncludes', 'Includes');
		var tabParameter = tabbar.tabs('tabParameter');
		var tabEnvironment = tabbar.tabs('tabEnvironment');
		var tabIncludes = tabbar.tabs('tabIncludes');

		joe.loader.load('templates/environment', function () {
			this.views.environment = new Environment();
			/* todo */this.views.environment.setup(tabEnvironment);
		});

		joe.loader.load('templates/includes', function () {
			this.views.includes = new Includes();
			/* todo */this.views.includes.setup(tabIncludes);
		});
	};
})();