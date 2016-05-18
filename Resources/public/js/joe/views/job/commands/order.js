(function ()
	function Order(binder) {
		this.binder = binder;
	}

	Order.prototype = new View();

	Order.prototype.setup = function (parent) {
		var formDesc = [
			{ type: 'input', name: 'jobChain', label: 'Job Chain' },
			{ type: 'input', name: 'orderId', label: 'Job/Order' },
			{ type: 'input', name: 'at', label: 'Start at' },
			{ type: 'input', name: 'priority', label: 'Priority' },
			{ type: 'input', name: 'title', label: 'Title' },
			{ type: 'input', name: 'state', label: 'State' },
			{ type: 'input', name: 'endState', label: 'End State' },
			{ type: 'checkbox', name: 'replace', labe: 'Replace' }
		];

		this.form = parent.attachForm(formDesc);
	};
)();
