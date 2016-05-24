'use strict';

(function () {
	function Order(binder) {
		this.binder = binder;
	}

	Order.prototype = new View();

	Order.prototype.setup = function (parent) {
		var formDesc = [{ type: 'input', name: 'id', label: 'Order ID' }, { type: 'input', name: 'jobChain', label: 'Job Chain' }, { type: 'input', name: 'title', label: 'Title' }, { type: 'input', name: 'priority', label: 'Priority' }, { type: 'input', name: 'state', label: 'State' }, { type: 'input', name: 'endState', label: 'End State' }, { type: 'block', list: [{ type: 'select', name: '', label: 'State' }, { type: 'nextcolumn' }, { type: 'button', name: 'paramater', label: 'Parameter' }] }];
	};
})();