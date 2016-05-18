var JOE = (function() {

	function stateRibbon (itemid, state) {
		console.log("stateRibon:", itemid, ",", state);
	}

	function clickRibbon (itemid, state) {
		console.log("clickRibbon:", itemid, ",", state);
	}

	function JOE (anchor, routes) {
		this.layout = new dhtmlXLayoutObject({
			parent: anchor,
			pattern: '2U'
		});

		this.routes = routes;
		this.loader = new Loader();
		this.view = new ViewManager();
	}

	JOE.prototype = {
		start: function() {
			this.left = this.layout.cells('a');
			this.right = this.layout.cells('b');

			this.left.setWidth(300);
			this.left.hideHeader();
			this.right.hideHeader();

			var menu = this.left.attachMenu();
			menu.setIconsPath(this.routes.ui.menu.icons);
			menu.loadStruct(this.routes.ui.menu.url);

			var ribbon = this.left.attachRibbon();
			ribbon.setIconPath(this.routes.ui.ribbon.icons);
			ribbon.loadStruct(this.routes.ui.ribbon.url);
			ribbon.attachEvent("onStateChange", stateRibbon );
			ribbon.attachEvent("onClick", clickRibbon);

			var treeObj = this.left.attachTree();
			treeObj.setImagePath("/bundles/ariicore/images/tree/");
			this.tree = new ControlTree(treeObj);

			this.loader.load('build_tree', function(buildTree) {
				buildTree(this.tree);
			}.bind(this));
		}
	}

	return JOE;
})();
