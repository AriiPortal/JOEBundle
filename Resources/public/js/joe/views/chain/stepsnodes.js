(function () {
	function StepsNodes(binder)
	{
		this.binder = binder;
	}

	StepsNodes.prototype = new View();

	StepsNodes.prototype.setup = function (parent) {
		var tabbar = parent.attachTabbar();

	};


})();
