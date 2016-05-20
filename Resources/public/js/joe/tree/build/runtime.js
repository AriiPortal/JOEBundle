joe.loader.load('tree/build/runtime/weekdays', function(WeekdaysNode) {
joe.loader.load('tree/build/runtime/monthdays', function(MonthdaysNode) {
joe.loader.load('tree/build/runtime/ultimos', function(UltimosNode) {

	function RuntimeNode (binder) {
		this.binder = binder;
	}

	RuntimeNode.prototype = new Node;


	function weekdays (binder) {
		var node = new WeekdaysNode(binder);
		node.init(false, 'any Weekday');
		return node;
	}


	function monthdays (binder) {
		var node = new MonthdaysNode(binder);
		node.init(false, 'Days in a Month');
		return node;
	}

	function ultimos (binder) {
		var node = new UltimosNode(binder);
		node.init(false, 'Ultimo');
		return node;
	}

	var runtimeSub = [
		weekdays,
		monthdays,
		ultimos
		/*genLoadViewNode('any Weekday', 'templates/runtime/weekdays'),
		  genLoadViewNode('Days in a Month', 'templates/runtime/monthdays'),
		  genLoadViewNode('Ultimo', 'templates/runtime/ultimos'),
		  genLoadViewNode('Specific Days of Week', 'templates/runtime/weekday'),
		  genLoadViewNode('Specific Days', 'templates/runtime/dates'),
		  genLoadViewNode('Specific Months', 'templates/runtime/month'),
		  genLoadViewNode('Non Working Days', 'templates/runtime/holidays'),*/
	];

	RuntimeNode.prototype.loadChildren = function (callback) {
		for (var i = 0; i < runtimeSub.length; i++)
		{
			var sub = (runtimeSub[i])(this.binder, this.tree);
			sub.addTo(this.tree, this.obj.id);
		}
		callback();
	}

	joe.loader.finished(RuntimeNode);
});
});
});
