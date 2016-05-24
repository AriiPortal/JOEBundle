'use strict';

joe.loader.load('utils/binder/entity_binder', function (EntityBinder) {
	var formDesc = [{ type: 'input', name: 'state', label: 'State', labelWidth: 140 }, { type: 'input', name: 'jobChain', label: 'Job', labelWidth: 140 }, { type: 'input', name: 'nextState', label: 'Next State', labelWidth: 140 }, { type: 'input', name: 'errorState', label: 'Error State', labelWidth: 140 }, { type: 'block', list: [{ type: 'radio', name: 'type', value: 'full', label: 'Full Node' }, { type: 'newcolumn' }, { type: 'radio', name: 'type', value: 'end', label: 'End Node' }] }];

	var ctrlsDesc = [{ type: 'button', name: 'apply', value: 'Apply Chain Node', width: 140 }, { type: 'button', name: 'newNode', value: 'New Chain Node', width: 140 }, { type: 'button', name: 'insertNode', value: 'Insert Chain Node', width: 140 }];

	var gridCtrlsDesc = [{ type: 'button', name: 'remove', value: 'Remove Nodes', width: 140 }];

	var cols = [{ name: 'state', label: 'State' }, { name: 'node', label: 'Node' }, { name: 'jobChain', label: 'Job Chain' }, { name: 'nextState', label: 'Next State' }, { name: 'errorState', label: 'Error State' }, { name: 'onError', label: 'onError' }];

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

		this.ctrls.form = formCell.attachForm(formDesc);
		this.ctrls.formCtrls = ctrlsCell.attachForm(ctrlsDesc);
		this.ctrls.grid = gridCell.attachGrid();
		this.ctrls.gridCtrls = gridCtrlsCell.attachForm(gridCtrlsDesc);
	}

	function initGrid() {
		var _this = this;

		var header = cols.map(function (col) {
			return col.label;
		});
		this.ctrls.grid.setHeader(header.join(','));

		cols.map(function (col, i) {
			return _this.ctrls.grid.setColumnHidden(i, col.hidden ? col.hidden : false);
		});

		this.ctrls.grid.setEditable(false);
		this.ctrls.grid.init();
	}

	function nodeToRow(isEnd, node) {
		return [node.state, isEnd ? 'Endnode' : 'Job Chain', isEnd ? '' : node.jobChain, isEnd ? '' : node.nextState, isEnd ? '' : node.errorState, ''];
	}

	function feedData(isEnd, data) {
		for (var key in data) {
			var obj = data[key];
			createRow.bind(this)(isEnd, obj);
		}
	}

	function createRow(isEnd, obj) {
		this.ctrls.grid.addRow(obj.data.id, nodeToRow(isEnd, obj.data));
		this.ctrls.grid.setUserData(obj.data.id, 'isEnd', isEnd);
	}

	function removeRow(obj) {
		this.ctrls.grid.deleteRow(obj.data.id);
	}

	function mkDiff() {
		if (this.current.newIsEnd) {
			return {
				state: this.ctrls.form.getItemValue('state')
			};
		}

		return {
			state: this.ctrls.form.getItemValue('state'),
			jobChain: this.ctrls.form.getItemValue('jobChain'),
			nextState: this.ctrls.form.getItemValue('nextState'),
			errorState: this.ctrls.form.getItemValue('errorState')
		};
	}

	function create() {
		var binder;
		if (this.current.newIsEnd) {
			binder = this.binders.nodeEnd;
		} else {
			binder = this.binders.nodeJobChain;
		}

		var diff = mkDiff.bind(this)();

		this.newMode = false;
		this.current = null;
		resetForm.bind(this)();
		refreshForm.bind(this)();
		refreshCtrls.bind(this)();

		binder.create(diff);
	}

	function update() {
		var oldBinder = this.current.isEnd ? this.binders.nodeEnd : this.binders.nodeJobChain;

		var newBinder = this.current.newIsEnd ? this.binders.nodeEnd : this.binders.nodeJobChain;

		var diff = mkDiff.bind(this)();

		oldBinder.remove(this.current.id, function () {
			newBinder.create(diff, function () {
				this.editMode = false;
				this.current = null;
				resetForm.bind(this)();
				refreshForm.bind(this)();
				refreshCtrls.bind(this)();
			}.bind(this));
		}.bind(this));
	}

	function remove() {
		if (this.current && this.current.id != null) {
			var binder = this.current.isEnd ? this.binders.nodeEnd : this.binders.nodeJobChain;
			binder.remove(this.current.id, function () {
				this.current = null;
				this.editMode = false;
				resetForm.bind(this)();
				refreshForm.bind(this)();
				refreshCtrls.bind(this)();
			}.bind(this));
		}
	}

	function saveChanges() {
		if (this.newMode) {
			create.bind(this)();
		} else if (this.editMode) {
			update.bind(this)();
		}
	}

	function setupEvents() {
		this.ctrls.grid.attachEvent('onRowSelect', function (rid) {
			setCurrent.bind(this)(rid);
			resetForm.bind(this)();
			refreshForm.bind(this)();
			currentToForm.bind(this)();
			this.editMode = true;
			this.newMode = false;
			refreshCtrls.bind(this)();
		}.bind(this));

		this.ctrls.formCtrls.attachEvent('onButtonClick', function (id) {
			switch (id) {
				case 'apply':
					saveChanges.bind(this)();
					break;
				case 'newNode':
					this.editMode = false;
					this.newMode = true;
					this.current = { id: null, isEnd: false, isNewEnd: false };
					resetForm.bind(this)();
					refreshCtrls.bind(this)();
					break;
				case 'insertNode':
					this.editMode = false;
					this.newMode = true;
					this.current.newIsEnd = false;
					var nextState = this.ctrls.form.getItemValue('state');
					resetForm.bind(this)();
					this.ctrls.form.setItemValue('nextState', nextState);
					refreshForm.bind(this)();
					refreshCtrls.bind(this)();
					break;
			}
		}.bind(this));

		this.ctrls.gridCtrls.attachEvent('onButtonClick', function (id) {
			if (id == 'remove') {
				remove.bind(this)();
			}
		}.bind(this));

		this.ctrls.form.attachEvent('onChange', function (id) {
			if (id == 'type') {
				var isEnd = this.ctrls.form.getCheckedValue('type') == 'end';
				this.current.newIsEnd = isEnd;
			}
			refreshForm.bind(this)();
			refreshCtrls.bind(this)();
		}.bind(this));

		this.ctrls.form.attachEvent('onInputChange', function (id) {
			refreshCtrls.bind(this)();
		}.bind(this));
	}

	function setCurrent(rid) {
		var isEnd = this.ctrls.grid.getUserData(rid, 'isEnd');
		this.current = { id: rid, isEnd: isEnd, newIsEnd: isEnd };
	}

	function resetForm() {
		var _this2 = this;

		['state', 'jobChain', 'nextState', 'errorState'].map(function (name) {
			return _this2.ctrls.form.setItemValue(name, '');
		});
		this.ctrls.form.checkItem('type', 'full');
	}

	function currentToForm() {
		var binder = this.current.isEnd ? this.binders.nodeEnd : this.binders.nodeJobChain;
		obj = binder.getData(this.current.id).data;

		this.ctrls.form.setItemValue('state', obj.state);
		this.ctrls.form.checkItem('type', this.current.isEnd ? 'end' : 'full');

		if (!this.current.isEnd) {

			['jobChain', 'nextState', 'errorState'].map(function (name) {
				this.ctrls.form.setItemValue(name, obj[name]);
			}.bind(this));
		}
	}

	function refreshForm() {
		if (this.current) {
			this.ctrls.form.enableItem('state');
			var f = this.current.newIsEnd ? this.ctrls.form.disableItem : this.ctrls.form.enableItem;
			f.call(this.ctrls.form, 'jobChain');
			f.call(this.ctrls.form, 'nextState');
			f.call(this.ctrls.form, 'errorState');
			this.ctrls.form.enableItem('type', 'full');
			this.ctrls.form.enableItem('type', 'end');
		} else {
			['state', 'jobChain', 'nextState', 'errorState'].map(function (name) {
				this.ctrls.form.disableItem(name);
			}.bind(this));
			this.ctrls.form.disableItem('type', 'full');
			this.ctrls.form.disableItem('type', 'end');
		}
	}

	function refreshCtrls() {
		if (!this.editMode && !this.newMode) {
			this.ctrls.formCtrls.disableItem('apply');
			this.ctrls.formCtrls.disableItem('insertNode');
		} else {
			var stateSet = this.ctrls.form.getItemValue('state').length > 0;
			var jobChainSet = this.ctrls.form.getItemValue('jobChain').length > 0;
			var canApply = this.current.newIsEnd ? stateSet : stateSet && jobChainSet;

			if (canApply) this.ctrls.formCtrls.enableItem('apply');else this.ctrls.formCtrls.disableItem('apply');

			if (stateSet) this.ctrls.formCtrls.enableItem('insertNode');else this.ctrls.formCtrls.disableItem('insertNode');
		}
	}

	var build = function build(binder) {
		var view = new View();

		view.setup = function (parent) {
			this.ctrls = {};
			this.binders = {
				nodeJobChain: null,
				nodeEnd: null
			};
			this.binders.nodeJobChain = new EntityBinder('jobChainNodeJobChain', binder, 'jobChainNodeJobChainCollection');
			this.binders.nodeEnd = new EntityBinder('jobChainNodeEnd', binder, 'jobChainNodeEndCollection');

			this.current = null;

			this.editMode = false;
			this.newMode = false;

			createControls.bind(this)(parent);
			initGrid.bind(this)();
			setupEvents.bind(this)();
			refreshForm.bind(this)();
			refreshCtrls.bind(this)();
		};

		view.init = function () {
			(function () {
				var callbacks = {
					onInit: feedData.bind(this, false),
					onUpdate: null,
					onCreate: createRow.bind(this, false),
					onRemove: removeRow.bind(this)
				};
				var selector = {
					errorState: true,
					jobChain: true,
					nextState: true,
					state: true
				};
				this.binders.nodeJobChain.register(view, callbacks, selector);
			}).bind(this)();
			(function () {
				var callbacks = {
					onInit: feedData.bind(this, true),
					onUpdate: null,
					onCreate: createRow.bind(this, true),
					onRemove: removeRow.bind(this)
				};
				var selector = {
					state: true
				};
				this.binders.nodeEnd.register(view, callbacks, selector);
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