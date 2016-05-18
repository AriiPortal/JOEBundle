(function () {
	var build = function (binder)
	{
		var view = new View();
		view.setup = function (parent) {
			var formDesc = [
				{ type: 'input', name: 'name', label: 'Chain Name' },
				{ type: 'input', name: 'title', label: 'Title' },
				{ type: 'input', name: 'maxOrders', label: 'MaxOrders' },
				{ type: 'combo', name: 'processClass', label: 'Process Class Job Chain' },
				{ type: 'combo', name: 'fileWatchingProcessClass', label: 'Process Class File Watcher' },
				{ type: 'checkbox', name: 'ordersRecoverable', label: 'OrdersRecoverable' },
				{ type: 'checkbox', name: 'distributed', label: 'Distributed' },
				{ type: 'checkbox', name: 'visible', label: 'visible' }
			];
			
			var fields = [
				{ name: 'name' },
				{ name: 'title' },
				{ name: 'maxOrders' },
				{ name: 'processClass', type: 'combo' },
				{ name: 'fileWatchingProcessClass', type: 'combo' },
				{ name: 'ordersRecoverable', type: 'checkbox' },
				{ name: 'distributed', type: 'checkbox' },
				{ name: 'visible', type: 'checkbox' }
			];

			var dhtmlx = parent.attachForm(formDesc);
			new Form(form.dhtmlx, fields, binder);
		};
	}

	joe.loader.finished(build);
})();
