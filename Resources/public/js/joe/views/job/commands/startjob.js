'use strict';

(function () {
	function StartJob(binder) {
		this.binder = binder;
	}

	StartJob.prototype = new View();

	StartJob.prototype.setup = function (parent) {
		var formDesc = [{ type: 'input', name: 'job', label: 'Job/Order' }, { type: 'input', name: 'at', label: 'Start at' }];

		this.form = parent.attachForm(formDesc);
	};
})();