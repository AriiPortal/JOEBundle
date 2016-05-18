(function () {
	function Nodes(binder)
	{
		this.binder = binder;
	}

	Nodes.prototype = new View();

	Nodes.prototype.setup = function (parent) {
		var layout = parent.attachLaout('2E');
		var topLayout = layout.cells('a').attachLayout('2U');
		var bottomLayout = layout.cells('b').attachLayout('2U');
		var formCell = topLayout.cells('a');
		var formControlsCell = topLayout.cells('b');
		var gridCell = bottomLayout.cells('a');
		var gridControlsCell = bottomLayout.cells('b');

		var onErrorOptions = [
			''
			, 'suspend'
			, 'setback'
		].map(
			x => return { label: x, value: x };
		);

		var formDesc = [
			{ type: 'input', name: 'state', label: 'State' },
			{ type: 'input', name: 'job', label: 'Job' },
			{ type: 'block', list: [
				{ type: 'input', name: 'nextState', label: 'Next State' },
				{ type: 'nextcolumn' },
				{ type: 'input', name: 'delay', label: 'Delay' }
			] },
			{ type: 'block', list: [
				{ type: 'input', name: 'errorState', label: 'Error State' },
				{ type: 'nextcolumn' },
				{ type: 'select', name: 'onError', label: 'On Error', options: onErrorOptions }
				{ type: 'checkbox', name: '', label: 'Remove File' }
			] },
			{ type: 'block' list: [
				{ type: 'radio', name: 'type', value: 'full', label: 'Full Node' },
				{ type: 'nextcolumn' },
				{ type: 'radio', name: 'type', value: 'end', label: 'End Node' },
				{ type: 'nextcolumn' },
				{ type: 'radio', name: 'type', value: 'filesink', label: 'File Sink' },
				{ type: 'nextcolumn' },
				{ type: 'input', name: 'moveTo', label: 'Move To' }
			] }
		];

		var formControlsDesc = [
			{ type: 'button', name: 'apply', label: 'Apply Chain Node' },
			{ type: 'button', name: 'newNode', label: 'New Chain Node' },
			{ type: 'button', name: 'insertNode', label: 'Insert Chain Node' }
		];

		var gridControlsDesc = [
			{ type: 'button', name: 'moveUp', label: 'up' },
			{ type: 'button', name: 'moveDown', label: 'down' },
			{ type: 'checkbox', name: 'reorder', label: 'Reorder' },
			{ type: 'button', name: 'parameter', label: 'Parameter' },
			{ type: 'button', name: 'addMissing', label: 'Add Missing Nodes' },
			{ type: 'button', name: 'returnCodes', label: 'Return Codes' },
			{ type: 'button', name: 'remove', label: 'Remove Nodes' }
		];

		formCell.attachForm(formDesc);
		formControlsCell.attachForm(formControlsDesc);
		gridCell.attachGrid();
		gridControlsCell.attachForm(gridControlsDesc);
	};
})();
