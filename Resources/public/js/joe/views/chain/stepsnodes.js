'use strict';

joe.loader.load('views/chain/stepsnodes/nodes', function (nodes) {
	joe.loader.load('views/chain/stepsnodes/fileordersource', function (fileOrderSource) {
		joe.loader.load('utils/binder/entity_binder', function (EntityBinder) {

			var build = function build(binder) {
				var view = new View();

				view.setup = function (parent) {
					var tabbar = parent.attachTabbar();

					tabbar.addTab('tabNodes', 'Nodes');
					tabbar.addTab('tabFileOrderSource', 'File Order Source');

					var tabNodes = tabbar.tabs('tabNodes');
					var tabFileOrderSource = tabbar.tabs('tabFileOrderSource');

					tabNodes.setActive();

					this.nodes = {};
					this.nodes.view = nodes(binder);
					this.nodes.view.setup(tabNodes);
					this.nodes.view.init();

					this.fileOrderSource = {};
					this.fileOrderSource.binder = new EntityBinder('fileOrderSource', binder, 'fileOrderSourceCollection');
					this.fileOrderSource.view = fileOrderSource(this.fileOrderSource.binder);
					this.fileOrderSource.view.setup(tabFileOrderSource);
					this.fileOrderSource.view.init();
				};

				view.destroy = function () {
					this.nodes.view.destroy();
					this.fileOrderSource.view.destroy();
					this.fileOrderSource.binder.destroy();
				};

				return view;
			};

			joe.loader.finished(build);
		});
	});
});