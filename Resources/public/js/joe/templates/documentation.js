(function () {
	function Documentation(binder)
	{
		this.binder = binder;
	}

	Documentation.prototype = new View();

	Documentation.prototype.setup = function (parent) {
		var formDesc = [
			{ type: 'fieldset', label: 'Comment', list: [
				{ type: 'input', name: '' }
			] },
			{ type: 'fieldset', label: 'Description', list: [
				{ type: 'input', name: 'description.file' },
				{ type: 'input', name: '' }
			] }
		];

		parent.attachForm(formDesc);
	};
})();
