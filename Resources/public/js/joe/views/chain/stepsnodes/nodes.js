'use strict';

joe.loader.load('utils/binder/entity_binder', function (EntityBinder) {
	var formDesc = [{ type: 'input', name: 'state', label: 'State', labelWidth: 140 }, { type: 'input', name: 'job', label: 'Job', labelWidth: 140 }, { type: 'block', list: [{ type: 'combo', name: 'nextState', label: 'Next State', labelWidth: 140, width: 150 }, { type: 'newcolumn' }, { type: 'input', name: 'delay', label: 'Delay', labelWidth: 140 }] }, { type: 'block', list: [{ type: 'combo', name: 'errorState', label: 'Error State', labelWidth: 140, width: 150 }, { type: 'newcolumn' }, { type: 'input', name: 'onError', label: 'On Error', labelWidth: 140 }] }, { type: 'block', list: [{ type: 'radio', name: 'type', label: 'Full Node', value: 'full' }, { type: 'newcolumn' }, { type: 'radio', name: 'type', label: 'End Node', value: 'end' }, { type: 'newcolumn' }, { type: 'radio', name: 'type', label: 'File Sink', value: 'sink' }, { type: 'newcolumn' }, { type: 'block', list: [{ type: 'checkbox', name: 'removeFile', label: 'Remove File' }, { type: 'input', name: 'moveTo', label: 'Move To' }] }] }];

	var ctrlsDesc = [{ type: 'button', name: 'apply', value: 'Apply Chain Node', width: 140 }, { type: 'button', name: 'newNode', value: 'New Chain Node', width: 140 }, { type: 'button', name: 'insertNode', value: 'Insert Chain Node', width: 140 }];

	var gridCtrlsDesc = [{ type: 'button', name: 'remove', value: 'Remove Node', width: 140 }];

	var cols = ['State', 'Node', 'Job Directory', 'Next State', 'Error State', 'On Error'];

	function createControls(parent) {
		var layout = parent.attachLayout('2E');

		layout.cells('a').fixSize(false, true);
		layout.cells('a').setHeight(200);

		var topLayout = layout.cells('a').attachLayout('2U');
		var bottomLayout = layout.cells('b').attachLayout('2U');

		var formCell = topLayout.cells('a');
		var ctrlsCell = topLayout.cells('b');
		var gridCell = bottomLayout.cells('a');
		var gridCtrlsCell = bottomLayout.cells('b');

		formCell.hideHeader();
		ctrlsCell.hideHeader();
		gridCell.hideHeader();
		gridCtrlsCell.hideHeader();

		ctrlsCell.fixSize(true, false);
		gridCtrlsCell.fixSize(true, false);
		ctrlsCell.setWidth(150);
		gridCtrlsCell.setWidth(150);

		this.form = formCell.attachForm(formDesc);
		this.grid = gridCell.attachGrid();
		this.ctrls = {};
		this.ctrls.form = ctrlsCell.attachForm(ctrlsDesc);
		this.ctrls.grid = gridCtrlsCell.attachForm(gridCtrlsDesc);
	}

	function initGrid() {
		this.grid.setHeader(cols.join(','));
		this.grid.setEditable(false);
		this.grid.init();
	}

	function fileOrderSinkToRow(obj) {
		return [obj.state, 'FileSink', obj.remove ? 'Remove file' : obj.moveTo, '', '', ''];
	}

	function jobChainNodeToRow(isEnd, obj) {
		return [obj.state, isEnd ? 'Endnode' : 'Job', isEnd ? '' : obj.job, isEnd ? '' : obj.nextState, isEnd ? '' : obj.errorState, isEnd ? '' : obj.onError];
	}

	function feedFileOrderSinks(data) {
		for (var key in data) {
			var obj = data[key];
			createFileOrderSinkRow.bind(this)(data[key]);
		}
	}

	function createFileOrderSinkRow(obj) {
		var userData = {
			type: 'sink'
		};
		createRow.bind(this)(obj.data.id, fileOrderSinkToRow(obj.data), userData);
	}

	function feedJobChainNodes(data) {
		for (var key in data) {
			var obj = data[key];
			createJobChainNodeRow.bind(this)(data[key]);
		}
	}

	function createJobChainNodeRow(obj) {
		var isEnd = obj.data.nextState == null;
		var userData = {
			type: isEnd ? 'end' : 'full'
		};
		createRow.bind(this)(obj.data.id, jobChainNodeToRow(isEnd, obj.data), userData);
	}

	function createRow(rid, row, userData) {
		this.grid.addRow(rid, row);
		for (var key in userData) {
			this.grid.setUserData(rid, key, userData[key]);
		}
	}

	function removeRow(obj) {
		this.grid.deleteRow(obj.data.id);
	}

	function mkDiff(type) {
		var state = this.form.getItemValue('state');
		switch (type) {
			case 'sink':
				var remove = this.form.isItemChecked('removeFile');
				return {
					state: state,
					remove: remove,
					moveTo: remove ? null : this.form.getItemValue('moveTo')
				};
			case 'full':
			case 'end':
				var isEnd = type == 'end';
				return {
					state: state,
					job: isEnd ? null : this.form.getItemValue('job'),
					delay: 0 ? null : this.form.getItemValue('delay'),
					nextState: isEnd ? null : this.form.getItemValue('nextState'),
					errorState: isEnd ? null : this.form.getItemValue('errorState'),
					onError: isEnd ? null : this.form.getItemValue('onError')
				};
		}
	}

	function create() {
		var type = this.form.getCheckedValue('type');
		var diff = mkDiff.bind(this)(type);
		var binder;

		switch (type) {
			case 'sink':
				binder = this.binders.fileOrderSink;
				break;
			case 'full':
			case 'end':
				binder = this.binders.jobChainNode;
		}

		binder.create(diff, function () {
			this.current = null;
			this.newMode = false;
			this.editMode = false;
			currentToForm.bind(this)();
			refreshForm.bind(this)();
			refreshCtrls.bind(this)();
		}.bind(this));
	}

	function update() {
		var newType = this.form.getCheckedValue('type');
		var wasSink = this.current.type == 'sink';
		var isSink = newType == 'sink';

		var oldBinder = wasSink ? this.binders.fileOrderSink : this.binders.jobChainNode;

		var newBinder = isSink ? this.binders.fileOrderSink : this.binders.jobChainNode;

		var diff = mkDiff.bind(this)(newType);

		oldBinder.remove(this.current.id, function () {
			newBinder.create(diff, function () {
				this.current = null;
				this.newMode = false;
				this.editMode = false;
				currentToForm.bind(this)();
				refreshForm.bind(this)();
				refreshCtrls.bind(this)();
			}.bind(this));
		}.bind(this));
	}

	function remove() {
		var isSink = this.current.type == 'sink';
		var binder = isSink ? this.binders.fileOrderSink : this.binders.jobChainNode;

		binder.remove(this.current.id, function () {
			this.current = null;
			this.newMode = false;
			this.editMode = false;
			currentToForm.bind(this)();
			refreshForm.bind(this)();
			refreshCtrls.bind(this)();
		}.bind(this));
	}

	function saveChanges() {
		if (this.newMode) {
			create.bind(this)();
		} else if (this.editMode) {
			update.bind(this)();
		}
	}

	function setupEvents() {
		this.grid.attachEvent('onRowSelect', function (rid) {
			this.current = {
				id: rid,
				type: this.grid.getUserData(rid, 'type')
			};
			this.newMode = false;
			this.editMode = true;
			currentToForm.bind(this)();
			refreshForm.bind(this)();
			refreshCtrls.bind(this)();
		}.bind(this));

		this.ctrls.form.attachEvent('onButtonClick', function (id) {
			switch (id) {
				case 'apply':
					saveChanges.bind(this)();
					break;
				case 'newNode':
					this.current = null;
					this.newMode = true;
					this.editMode = false;
					currentToForm.bind(this)();
					refreshForm.bind(this)();
					refreshCtrls.bind(this)();
					break;
				case 'insertNode':
					var nextState = this.form.getItemValue('state');
					this.current = null;
					this.newMode = true;
					this.editMode = false;
					currentToForm.bind(this)();
					refreshForm.bind(this)();
					refreshCtrls.bind(this)();
					this.form.setItemValue('nextState', nextState);
					this.form.getCombo('nextState').setComboText(nextState);
					break;
			}
		}.bind(this));

		this.ctrls.grid.attachEvent('onButtonClick', function (id) {
			if (id == 'remove') {
				remove.bind(this)();
			}
		}.bind(this));

		this.form.attachEvent('onChange', function (id) {
			refreshForm.bind(this)();
			refreshCtrls.bind(this)();
		}.bind(this));

		this.form.attachEvent('onInputChange', function (id) {
			refreshCtrls.bind(this)();
		}.bind(this));
	}

	function currentToForm() {
		var state = '';
		var job = '';
		var nextState = '';
		var delay = '';
		var errorState = '';
		var onError = '';
		var type = 'full';
		var removeFile = false;
		var moveTo = '';

		if (this.current) {
			type = this.current.type;
			switch (type) {
				case 'sink':
					var binder = this.binders.fileOrderSink;
					var obj = binder.getData(this.current.id).data;
					removeFile = obj.remove;
					moveTo = removeFile ? '' : obj.moveTo;
					state = obj.state;
					break;
				case 'full':
				case 'end':
					var binder = this.binders.jobChainNode;
					var isEnd = this.current.type == 'end';
					var obj = binder.getData(this.current.id).data;
					state = obj.state;
					if (!isEnd) {
						job = obj.job;
						nextState = obj.nextState;
						delay = obj.delay;
						errorState = obj.errorState;
						onError = obj.onError;
					}
			}
		}

		this.form.setItemValue('state', state);
		this.form.setItemValue('job', job);
		this.form.setItemValue('nextState', nextState);
		this.form.getCombo('nextState').setComboText(nextState);
		this.form.setItemValue('delay', delay);
		this.form.setItemValue('errorState', errorState);
		this.form.setItemValue('onError', onError);
		this.form.setItemValue('moveTo', moveTo);

		this.form.checkItem('type', type);

		if (removeFile) this.form.checkItem('removeFile');else this.form.uncheckItem('removeFile');
	}

	function refreshForm() {
		var disable = this.form.disableItem;
		var enable = this.form.enableItem;

		var actions = {
			state: disable,
			job: disable,
			nextState: disable,
			delay: disable,
			errorState: disable,
			onError: disable,
			removeFile: disable,
			moveTo: disable
		};

		var typeAction = disable;

		if (this.newMode || this.editMode) {
			var newType = this.form.getCheckedValue('type');
			actions.state = enable;
			typeAction = enable;
			switch (newType) {
				case 'full':
					actions.job = enable;
					actions.nextState = enable;
					actions.delay = enable;
					actions.errorState = enable;
					actions.onError = enable;
				case 'end':
					break;
				case 'sink':
					actions.removeFile = enable;
					actions.moveTo = this.form.isItemChecked('removeFile') ? disable : enable;
			}
		}
		for (var key in actions) {
			action = actions[key];
			action.call(this.form, key);
		}

		typeAction.call(this.form, 'type', 'full');
		typeAction.call(this.form, 'type', 'end');
		typeAction.call(this.form, 'type', 'sink');
	}

	function refreshCtrls() {
		var disable = this.ctrls.form.disableItem;
		var enable = this.ctrls.form.enableItem;

		var actions = {
			form: {
				apply: disable,
				insertNode: disable
			},
			grid: {
				remove: disable
			}
		};

		if (this.editMode || this.newMode) {
			var stateSet = this.form.getItemValue('state').length > 0;
			var jobSet = this.form.getItemValue('job').length > 0;
			var canApply;
			var newType = this.form.getItemValue('type');
			switch (newType) {
				case 'full':
					canApply = stateSet && jobSet;
					break;
				case 'sink':
				case 'end':
					canApply = stateSet;
			}
			actions.form.apply = canApply ? enable : disable;
			actions.form.insertNode = stateSet ? enable : disable;
		}

		actions.grid.remove = this.current ? enable : disable;

		actions.form.apply.call(this.ctrls.form, 'apply');
		actions.form.insertNode.call(this.ctrls.form, 'insertNode');
		actions.grid.remove.call(this.ctrls.grid, 'remove');
	}

	var build = function build(binder) {
		var view = new View();

		view.setup = function (parent) {
			this.binders = {};
			this.binders.jobChainNode = new EntityBinder('jobChainNode', binder, 'jobChainNodeCollection');
			this.binders.fileOrderSink = new EntityBinder('fileOrderSink', binder, 'fileOrderSinkCollection');

			this.current = null;

			this.editMode = false;
			this.newMode = false;

			createControls.bind(this)(parent);
			initGrid.bind(this)();
			currentToForm.bind(this)();
			refreshForm.bind(this)();
			refreshCtrls.bind(this)();
			setupEvents.bind(this)();
		};

		view.init = function () {
			(function () {
				var callbacks = {
					onInit: feedFileOrderSinks.bind(this),
					onUpdate: null,
					onCreate: createFileOrderSinkRow.bind(this),
					onRemove: removeRow.bind(this)
				};
				var selector = {
					errorState: true,
					jobChain: true,
					nextState: true,
					state: true
				};
				this.binders.fileOrderSink.register(view, callbacks, selector);
			}).bind(this)();
			(function () {
				var callbacks = {
					onInit: feedJobChainNodes.bind(this),
					onUpdate: null,
					onCreate: createJobChainNodeRow.bind(this),
					onRemove: removeRow.bind(this)
				};
				var selector = {
					state: true
				};
				this.binders.jobChainNode.register(view, callbacks, selector);
			}).bind(this)();
		};

		view.destroy = function () {
			for (var key in this.binders) {
				this.binders[key].unregister(view);
				this.binders[key].destroy();
			}
		};

		return view;
	};

	joe.loader.finished(build);
});