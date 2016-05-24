'use strict';

(function () {

	var formDesc = [{ type: 'input', name: 'name', label: 'Chain Name', labelWidth: 140, inputWidth: 150 }, { type: 'input', name: 'title', label: 'Title', labelWidth: 140, inputWidth: 150 }, { type: 'input', name: 'maxOrders', label: 'MaxOrders', labelWidth: 140, inputWidth: 150 }, { type: 'combo', name: 'processClass', label: 'Process Class Job Chain', labelWidth: 140, inputWidth: 150 }, { type: 'combo', name: 'fileWatchingProcessClass', label: 'Process Class File Watcher', labelWidth: 140, inputWidth: 150 }, { type: 'checkbox', name: 'ordersRecoverable', label: 'OrdersRecoverable', labelWidth: 140 }, { type: 'checkbox', name: 'distributed', label: 'Distributed', labelWidth: 140 }, { type: 'checkbox', name: 'visible', label: 'visible', labelWidth: 140 }];

	var fields = [{ name: 'name' }, { name: 'title' }, { name: 'maxOrders' }, { name: 'processClass' }, { name: 'fileWatchingProcessClass' }, { name: 'ordersRecoverable', type: 'checkbox' }, { name: 'distributed', type: 'checkbox' }, { name: 'visible', type: 'checkbox' }];

	var build = function build(binder) {
		var view = new View();

		view.setup = function (parent) {
			var dhtmlx = parent.attachForm(formDesc);
			this.form = new Form(dhtmlx, fields, binder);
		};

		view.destroy = function () {
			this.form.destroy();
		};

		return view;
	};

	joe.loader.finished(build);
})();