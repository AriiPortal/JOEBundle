'use strict';

(function () {

	var desc = [{ type: 'block', list: [{ type: 'input', name: 'filename' }, { type: 'newcolumn' }, { type: 'checkbox', name: 'inlive', label: 'in Live Folder' }] }, { type: "input", name: "description.content", rows: "10", inputWidth: 600 }];

	var fields = [{ name: 'description.content' }];

	var build = function build(binder) {
		var view = new View();

		function updateForm(data) {
			data = data.description.includeFile;
			if (!data) return;

			var inlive = data.file == null;
			if (inlive) this.dhtmlxForm.checkItem('inlive');else this.dhtmlxForm.uncheckItem('inlive');

			this.dhtmlxForm.setItemValue('filename', inlive ? data.liveFile : data.file);
		}

		view.setup = function (parent) {
			view.dhtmlxForm = parent.attachForm(desc);
			view.form = new Form(view.dhtmlxForm, fields, binder);

			var callbacks = {
				onInit: updateForm.bind(this),
				onUpdate: updateForm.bind(this)
			};

			var selector = { 'description': { 'includeFile': true } };
			binder.register(this, callbacks, selector);

			view.dhtmlxForm.attachEvent('onChange', function (id, value, checked) {
				if (id != 'inlive' && id != 'filename') return;

				var diff = { description: { includeFile: {} } };
				var ptr = diff.description.includeFile;

				var val = this.dhtmlxForm.getItemValue('filename');
				var inlive = this.dhtmlxForm.isItemChecked('inlive');

				ptr.file = inlive ? null : val;
				ptr.liveFile = inlive ? val : null;

				binder.update(diff);
			}.bind(this));
		};

		view.destroy = function () {
			view.form.destroy();
			binder.unregister(this);
		};

		return view;
	};

	joe.loader.finished(build);
})();