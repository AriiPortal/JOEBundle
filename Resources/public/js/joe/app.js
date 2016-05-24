'use strict';

var JOE = function () {

	function clickRibbon(id, state) {
		if (id == 'sync') {
			this.ribbon.disable('sync');

			var url = joe.routes.api().sync;
			var xhr = new XMLHttpRequest();
			xhr.open("GET", url, true);

			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						location.reload();
					} else {
						console.error("Could not sync: " + xhr.responseText);
					}
				}
			}.bind(this);
			xhr.send();
		}
	}

	function JOE(anchor, routes) {
		this.layout = new dhtmlXLayoutObject({
			parent: anchor,
			pattern: '2U'
		});

		this.routes = routes;
		this.loader = new Loader();
		this.view = new ViewManager();
	}

	JOE.prototype = {
		start: function start() {
			this.left = this.layout.cells('a');
			this.right = this.layout.cells('b');

			this.left.setWidth(300);
			this.left.hideHeader();
			this.right.hideHeader();

			var menu = this.left.attachMenu();
			menu.setIconsPath(this.routes.ui.menu.icons);
			menu.loadStruct(this.routes.ui.menu.url);

			this.ribbon = this.left.attachRibbon();
			this.ribbon.setIconPath(this.routes.ui.ribbon.icons);
			this.ribbon.loadStruct(this.routes.ui.ribbon.url);
			this.ribbon.attachEvent("onClick", clickRibbon.bind(this));

			var treeObj = this.left.attachTree();
			treeObj.setImagePath("/bundles/ariicore/images/tree/");
			this.tree = new ControlTree(treeObj);

			this.loader.load('build_tree', function (buildTree) {
				buildTree(this.tree);
			}.bind(this));
		}
	};

	return JOE;
}();