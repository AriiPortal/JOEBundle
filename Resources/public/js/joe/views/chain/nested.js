(function () {
	var ctrls;
	var nodes;
	var endNodes;
	
	var formDesc = [
		{ type: 'input', name: 'state', label: 'State' },
		{ type: 'input', name: 'job', label: 'Job' },
		{ type: 'input', name: 'nextState', label: 'Next State' },
		{ type: 'input', name: 'errorState', label: 'Error State' },
		{ type: 'block' list: [
			{ type: 'radio', name: 'type', value: 'full', label: 'Full Node' },
			{ type: 'newcolumn' },
			{ type: 'radio', name: 'type', value: 'end', label: 'End Node' },
		] }
	];

	var ctrlsDesc = [
		{ type: 'button', name: 'apply', label: 'Apply Chain Node' },
		{ type: 'button', name: 'newNode', label: 'New Chain Node' },
		{ type: 'button', name: 'insertNode', label: 'Insert Chain Node' }
	];

	var gridCtrlsDesc = [
		{ type: 'button', name: 'moveUp', label: 'up' },
		{ type: 'button', name: 'moveDown', label: 'down' },
		{ type: 'checkbox', name: 'reorder', label: 'Reorder' },
		{ type: 'button', name: 'parameter', label: 'Parameter' },
		{ type: 'button', name: 'addMissing', label: 'Add Missing Nodes' },
		{ type: 'button', name: 'remove', label: 'Remove Nodes' }
	];

	var cols = [
		{ name: 'id', hidden: true },
		{ name: 'isEnd', hidden: true },
		{ name: 'state', label: 'State' },
		{ name: 'node', label: 'Node' },
		{ name: 'jobChain', label: 'Job Chain' },
		{ name: 'nextState', label: 'Next State' },
		{ name: 'errorState', label: 'Error State' },
		{ name: 'onError', label: 'onError' }
	];
	
	function createControls(parent)
	{
		var layout = parent.attachLayout('2E');
		var topLayout = layout.cells('a').attachLayout('2U');
		var bottomLayout = layout.cells('b').attachLayout('2U');

		var formCell = topLayout.cells('a');
		var ctrlsCell = topLayout.cells('b');
		var gridCell = bottomLayout.cells('a');
		var gridCtrlsCell = bottomLayout.cells('b');

		var form = formCell.attachForm(formDesc);
		var formCtrls = ctrlsCell.attachForm(ctrlsDesc);
		var grid = gridCell.attachGrid();
		var gridCtrls = gridCtrlsCell.attachForm(gridCtrlsCell);

		ctrls =  {
			form: form,
			formCtrls: formCtrls,
			grid: grid,
			gridCtrls: gridCtrls
		};
	}

	function initGrid()
	{
		var header = cols.map(
			col => col.label
		);
		ctrls.grid.setHeader(header.join(','));

		cols.map(
			(col, i) => ctrls.grid.setColumnHidden(i, col.hidden ? col.hidden : false)
		);

		ctrls.grid.init();
	}
	
	function retrieveNodes(nodeBinder)
	{
		var nodes = [];
		return nodes;
	}

	function retrieveEndNodes(endNodeBinder)
	{
		var endNodes = [];
		return endNodes;
	}

	function nodeToRow(node)
	{
		return [
			node.id,
			false,
			node.state,
			'Job Chain',
			node.jobChain,
			node.nextState,
			node.errorState,
			''
		];
	}

	function endNodeToRow(endNode)
	{
		return [
			node.id,
			true,
			node.state,
			'Endnode',
			'',
			'',
			'',
			''
		];
	}
	
	function initData(nodes, isEnd)
	{
		func = isEnd ? nodeToRow : endNodeToRow;
		
		return nodes.map(
			node => {
				ctrls.grid.addRow(node.id, func(node));
				return node.id;
			}
		);
	}

	function setupEvents()
	{
		ctrls.grid.attachEvent('onRowSelect', function (rid) {
			updateCurrent(rid);
			refresh();
		});

		ctrls.gridCtrls.attachEvent('onButtonClick', function (id) {
			if (id == 'remove')
			{
				removeCurrent();
			}
		});

			
	}

	function updateCurrent(rid)
	{
		var id = ctrls.grid.cellById(rid, 0);
		var isEnd = ctrls.grid.cellById(rid, 1);
		current = { id: id, isEnd: isEnd };
	}

	function removeCurrent()
	{
		if (current)
		{
			current.isEnd ? removeEndNode(current.id) : removeNode(current.id);
			current = null;
		}
	}
	
	
	var build = function (nodeBinder, endNodeBinder)
	{
		var view = new View();

		view.setup = function (parent) {
			createControls(parent);
			initGrid();
			setupEvents();
			nodes = initData(retrieveNodes(nodeBinder), false);
			endNodes = initData(retrieveEndNodes(endNodeBinder), true);

		}
		
		formCell.attachForm(formDesc);
		formControlsCell.attachForm(formControlsDesc);
		gridCell.attachGrid();
		gridControlsCell.attachForm(gridControlsDesc);
	}
})();
