'use strict';

joe.loader.load('utils/binder/entity_binder', function (EntityBinder) {

	var cols = ['Let Run', 'Begin', 'End', 'Intervall end/start', 'Single Start', 'Intervall start/start', 'When holiday'];

	var whenHolidayOpts = [{ value: 'suppress', label: 'suppress' }, { value: 'ignore_holiday', label: 'ignore_holiday' }, { value: 'previous_non_holiday', label: 'previous_non_holiday' }, { value: 'next_non_holiday', label: 'next_non_holiday' }];

	var formDesc = [{ type: 'fieldset', label: 'Time Slot', width: 500, list: [{ type: 'checkbox', name: 'letRun', label: 'Let Run', labelWidth: 140 }, { type: 'block', list: [{ type: 'input', name: 'begin_hh', label: 'Begin Time', labelWidth: 140, inputWidth: 20 }, { type: 'newcolumn' }, { type: 'input', name: 'begin_mm', label: ':', inputWidth: 20 }, { type: 'newcolumn' }, { type: 'input', name: 'begin_ss', label: ':', inputWidth: 20 }, { type: 'newcolumn' }, { type: 'label', label: 'hh:mm:ss' }] }, { type: 'block', list: [{ type: 'input', name: 'end_hh', label: 'End Time', labelWidth: 140, inputWidth: 20 }, { type: 'newcolumn' }, { type: 'input', name: 'end_mm', label: ':', inputWidth: 20 }, { type: 'newcolumn' }, { type: 'input', name: 'end_ss', label: ':', inputWidth: 20 }, { type: 'newcolumn' }, { type: 'label', label: 'hh:mm:ss' }] }] }, { type: 'fieldset', label: 'Start Time', width: 500, list: [{ type: 'combo', name: 'start', inputWidth: 140 }, { type: 'newcolumn' }, { type: 'input', name: 'start_hh', inputWidth: 20 }, { type: 'newcolumn' }, { type: 'input', name: 'start_mm', label: ':', inputWidth: 20 }, { type: 'newcolumn' }, { type: 'input', name: 'start_ss', label: ':', inputWidth: 20 }, { type: 'newcolumn' }, { type: 'label', label: 'hh:mm:ss' }] }, { type: 'fieldset', label: 'When Holiday', width: 500, list: [{ type: 'combo', name: 'whenHoliday', inputWidth: 140, options: whenHolidayOpts }] }];

	var formCtrlsDesc = [{ type: 'button', name: 'apply', value: 'Apply', width: 140 }, { type: 'button', name: 'new', value: 'New', width: 140 }];

	var gridCtrlsDesc = [{ type: 'button', name: 'remove', value: 'Remove', width: 140 }];

	function setupLayout(parent) {
		var layout = parent.attachLayout('2E');
		var topLayout = layout.cells('a').attachLayout('2U');
		var bottomLayout = layout.cells('b').attachLayout('2U');

		var formCell = topLayout.cells('a');
		var formCtrlsCell = topLayout.cells('b');
		var gridCell = bottomLayout.cells('a');
		var gridCtrlsCell = bottomLayout.cells('b');

		formCell.hideHeader();
		formCtrlsCell.hideHeader();
		gridCell.hideHeader();
		gridCtrlsCell.hideHeader();

		formCtrlsCell.fixSize(true, false);
		gridCtrlsCell.fixSize(true, false);
		formCtrlsCell.setWidth(150);
		gridCtrlsCell.setWidth(150);

		this.form = formCell.attachForm(formDesc);
		this.form.getCombo('start').readonly(true);
		this.form.getCombo('whenHoliday').readonly(true);

		this.grid = gridCell.attachGrid();
		this.ctrls = {
			form: formCtrlsCell.attachForm(formCtrlsDesc),
			grid: gridCtrlsCell.attachForm(gridCtrlsDesc)
		};
	}

	function setupGrid() {
		this.grid.setHeader(cols.join(','));
		this.grid.setEditable(false);
		this.grid.init();
	}

	function setupEvents() {
		this.grid.attachEvent('onRowSelect', function (rid) {
			this.current = rid;
			this.editMode = true;
			this.newMode = false;
			currentToForm.bind(this)();
			refreshForm.bind(this)();
			refreshCtrls.bind(this)();
		}.bind(this));

		this.ctrls.form.attachEvent('onButtonClick', function (id) {
			switch (id) {
				case 'new':
					this.current = null;
					this.editMode = false;
					this.newMode = true;
					currentToForm.bind(this)();
					refreshForm.bind(this)();
					refreshCtrls.bind(this)();
					break;
				case 'apply':
					save.bind(this)();
					break;
			}
		}.bind(this));

		this.ctrls.grid.attachEvent('onButtonClick', function () {
			remove.bind(this)();
		}.bind(this));

		this.form.attachEvent('onChange', function () {
			refreshForm.bind(this)();
			refreshCtrls.bind(this)();
		}.bind(this));
	}

	function feedRows(data) {
		for (var key in data) {
			addRow.bind(this)(data[key]);
		}
	}

	function mkRow(obj) {
		var whenHoliday = obj.whenHoliday == null || obj.whenHoliday == 'suppress' ? 'suppress execution' : obj.whenHoliday;

		var singleStart = obj.singleStart != null;
		var repeat = obj.repeat != null;
		var absRepeat = obj.absoluteRepeat != null;

		return [obj.letRun ? 'Yes' : 'No', singleStart ? '' : obj.begin, singleStart ? '' : obj.end, repeat ? obj.repeat : '', singleStart ? obj.singleStart : '', absRepeat ? obj.absoluteRepeat : '', whenHoliday];
	}

	function addRow(data) {
		var obj = data.data;
		this.grid.addRow(obj.id, mkRow.bind(this)(obj));
	}

	function removeRow(obj) {
		this.grid.deleteRow(obj.data.id);
	}

	function mkDiff() {
		var diff = {
			begin: null,
			end: null,
			letRun: false,
			singleStart: null,
			repeat: null,
			absoluteRepeat: null,
			whenHoliday: null
		};

		switch (this.form.getItemValue('whenHoliday')) {
			case 'ignore_holiday':
			case 'previous_non_holiday':
			case 'next_non_holiday':
				diff.whenHoliday = this.form.getItemValue('whenHoliday');
				break;
			default:
				diff.whenHoliday = 'suppress';
		}

		var time = mkTime(this.form.getItemValue('start_hh'), this.form.getItemValue('start_mm'), this.form.getItemValue('start_ss'));

		switch (this.form.getItemValue('start')) {
			case 'singleStart':
				diff.singleStart = time;
				break;
			case 'repeat':
			case 'absoluteRepeat':
				diff.begin = mkTime(this.form.getItemValue('begin_hh'), this.form.getItemValue('begin_mm'), this.form.getItemValue('begin_ss'));
				diff.end = mkTime(this.form.getItemValue('end_hh'), this.form.getItemValue('end_mm'), this.form.getItemValue('end_ss'));
				diff.letRun = this.form.isItemChecked('letRun');
				diff[this.form.getItemValue('start')] = time;
		}
		return diff;
	}

	function create() {
		var diff = mkDiff.bind(this)();
		this.binder.create(diff, function () {
			this.current = null;
			this.newMode = false;
			this.editMode = false;
			currentToForm.bind(this)();
			refreshForm.bind(this)();
			refreshCtrls.bind(this)();
		}.bind(this));
	}

	function update() {
		var diff = mkDiff.bind(this)();
		this.binder.remove(this.current, function () {
			this.binder.create(diff, function () {
				this.current = null;
				this.newMode = false;
				this.editMode = false;
				currentToForm.bind(this)();
				refreshForm.bind(this)();
				refreshCtrls.bind(this)();
			}.bind(this));
		}.bind(this));
	}

	function save() {
		if (this.newMode) {
			create.bind(this)();
		} else if (this.editMode) {
			update.bind(this)();
		}
	}

	function remove() {
		this.binder.remove(this.current, function () {
			this.current = null;
			this.newMode = false;
			this.editMode = false;
			currentToForm.bind(this)();
			refreshForm.bind(this)();
			refreshCtrls.bind(this)();
		}.bind(this));
	}

	function mkTime(hh, mm, ss) {
		return [hh, mm, ss].join(':');
	}

	function splitDelay(delay) {
		var d = delay.split(':');

		switch (d.length) {
			case 1:
				return {
					hh: '00',
					mm: '00',
					ss: d[0]
				};
			case 2:
				return {
					hh: d[0],
					mm: d[1],
					ss: '00'
				};
			case 3:
				return {
					hh: d[0],
					mm: d[1],
					ss: d[2]
				};
		}
	}

	function currentToForm() {
		var value = {
			input: {
				begin_hh: '00',
				begin_mm: '00',
				begin_ss: '00',
				end_hh: '00',
				end_mm: '00',
				end_ss: '00',
				start: 'single_start',
				start_hh: '00',
				start_mm: '00',
				start_ss: '00',
				whenHoliday: 'suppress'
			},
			checkbox: {
				letRun: false
			}
		};

		this.form.getCombo('start').clearAll();
		var opts = genOptions.bind(this)();
		this.form.getCombo('start').addOption(opts);

		if (this.editMode) {
			var obj = this.binder.getData(this.current).data;
			value.input.whenHoliday = obj.whenHoliday;
			var startTime;
			if (obj.singleStart != null) {
				startTime = obj.singleStart;
				value.input.start = 'singleStart';
			} else {
				var begin = splitDelay(obj.begin);
				var end = splitDelay(obj.end);
				value.checkbox.letRun = obj.letRun;
				if (obj.repeat != null) {
					startTime = obj.repeat;
					value.input.start = 'repeat';
				} else if (obj.absoluteRepeat != null) {
					startTime = obj.absoluteRepeat;
					value.input.start = 'absoluteRepeat';
				}
				value.input.begin_hh = begin.hh;
				value.input.begin_mm = begin.mm;
				value.input.begin_ss = begin.ss;
				value.input.end_hh = end.hh;
				value.input.end_mm = end.mm;
				value.input.end_ss = end.ss;
			}
			startTime = splitDelay(startTime);
			value.input.start_hh = startTime.hh;
			value.input.start_mm = startTime.mm;
			value.input.start_ss = startTime.ss;
		}

		for (var key in value.input) {
			this.form.setItemValue(key, value.input[key]);
		}

		if (value.checkbox.letRun) this.form.checkItem('letRun');else this.form.uncheckItem('letRun');
	}

	function refreshForm() {
		var enable = this.form.enableItem;
		var disable = this.form.disableItem;

		var state = {
			begin_hh: disable,
			begin_mm: disable,
			begin_ss: disable,
			end_hh: disable,
			end_mm: disable,
			end_ss: disable,
			start: disable,
			start_hh: disable,
			start_mm: disable,
			start_ss: disable,
			whenHoliday: disable,
			letRun: disable
		};

		if (this.newMode || this.editMode) {
			state.start = enable;
			state.start_hh = enable;
			state.start_mm = enable;
			state.start_ss = enable;
			state.whenHoliday = enable;

			var start = this.form.getItemValue('start');

			switch (start) {
				case 'singleStart':
					break;
				case 'repeat':
				case 'absoluteRepeat':
					state.begin_hh = enable;
					state.begin_mm = enable;
					state.begin_ss = enable;
					state.end_hh = enable;
					state.end_mm = enable;
					state.end_ss = enable;
					state.letRun = enable;
					break;
			}
		}

		for (var key in state) {
			state[key].call(this.form, key);
		}
	}

	function refreshCtrls() {
		this.ctrls.form.disableItem('apply');
		this.ctrls.grid.disableItem('remove');

		if (this.current != null) this.ctrls.grid.enableItem('remove');

		if (this.newMode || this.editMode) {
			if (this.form.getItemValue('start') == 'singleStart' || this.form.getItemValue('start') == 'repeat' || this.form.getItemValue('start') == 'absoluteRepeat') {
				this.ctrls.form.enableItem('apply');
			}
		}
	}

	function genOptions() {
		var singleStartOpt = ['singleStart', 'Single Start'];
		var repeatOpts = [['repeat', 'Intervall end/start'], ['absoluteRepeat', 'Intervall end/end']];

		if (this.editMode) return [singleStartOpt].concat(repeatOpts);

		if (this.newMode) {
			var hasRepeat = false;

			for (var id in this.binder.data) {
				var obj = this.binder.data[id].data;
				hasRepeat = obj.repeat != null || obj.absoluteRepeat != null;
				if (hasRepeat) break;
			}

			if (hasRepeat) return [singleStartOpt];else return [singleStartOpt].concat(repeatOpts);
		}

		return [];
	}

	var build = function build(binder) {
		var view = new View();

		view.setup = function (parent) {
			this.binder = new EntityBinder('period', binder, 'periods');
			this.current = null;
			this.newMode = false;
			this.editMode = false;

			setupLayout.bind(this)(parent);
			setupGrid.bind(this)();
			setupEvents.bind(this)();

			currentToForm.bind(this)();
			refreshForm.bind(this)();
			refreshCtrls.bind(this)();
		};

		view.init = function () {
			var callbacks = {
				onInit: feedRows.bind(this),
				onUpdate: null,
				onCreate: addRow.bind(this),
				onRemove: removeRow.bind(this)
			};

			var selector = {
				begin: true,
				end: true,
				letRun: true,
				singleStart: true,
				repeat: true,
				absoluteRepeat: true,
				whenHoliday: true
			};

			this.binder.register(this, callbacks, selector);
		};

		view.destroy = function () {
			this.binder.unregister(this);
			this.binder.destroy();
		};

		return view;
	};

	joe.loader.finished(build);
});

