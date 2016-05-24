"use strict";

(function () {

	var desc = [{ type: "input", name: "script.code", rows: "10", inputWidth: 600 }];

	var fields = [{ name: 'script.code' }];

	var build = function build(binder) {
		var view = new View();

		view.setup = function (parent) {
			var dhtmlxForm = parent.attachForm(desc);
			view.form = new Form(dhtmlxForm, fields, binder);
		};

		view.destroy = function () {
			view.form.destroy();
		};

		return view;
	};

	joe.loader.finished(build);
})();