'use strict';

(function () {

	function Options(binder) {
		this.binder = binder;
	}

	Options.prototype = new View();

	Options.prototype.init = function (data) {
		var selector = { name: true };

		var update = function (data) {
			this.main.setText(data.name);
		}.bind(this);

		var callbacks = {
			onInit: update,
			onUpdate: update
		};

		this.binder.register(this, callbacks, selector);
	};

	Options.prototype.destroy = function () {
		this.binder.unregister(this);
		this.form.destroy();
	};

	Options.prototype.setup = function (parent) {
		var layout = parent.attachLayout('1C');
		this.main = layout.cells('a');
		var str = [{ type: "input", name: "jobScheduler.name", label: "Scheduler ID", labelWidth: 140 }, { type: "input", name: "javaOptions", label: "Java Options", labelWidth: 140 }, { type: "block", name: "form_block_1", list: [{ type: "input", name: "ignoreSignals", label: "Ignore signals", labelWidth: 140 }, { type: "newcolumn" }, { type: "button", name: "add_signal", value: "<- Add <-" }, { type: "newcolumn" }, { type: "select", name: "signal_select", inputWidth: 140,
				options: [{ value: "SIGHUP", text: "SIGHUP" }, { value: "SIGINT", text: "SIGINT" }, { value: "SIGQUIT", text: "SIGQUIT" }, { value: "SIGILL", text: "SIGILL" }, { value: "SIGTRAP", text: "SIGTRAP" }, { value: "SIGABRT", text: "SIGABRT" }, { value: "SIGIOT", text: "SIGIOT" }, { value: "SIGBUS", text: "SIGBUS" }, { value: "SIGFPE", text: "SIGFPE" }, { value: "SIGKILL", text: "SIGKILL" }, { value: "SIGUSR1", text: "SIGUSR1" }, { value: "SIGSEGV", text: "SIGSEGV" }, { value: "SIGUSR2", text: "SIGUSR2" }, { value: "SIGPIPE", text: "SIGPIPE" }, { value: "SIGALRM", text: "SIGALRM" }, { value: "SIGTERM", text: "SIGTERM" }, { value: "SIGSTKFLT", text: "SIGSTKFLT" }, { value: "SIGCHLD", text: "SIGCHLD" }, { value: "SIGCONT", text: "SIGCONT" }, { value: "SIGSTOP", text: "SIGSTOP" }, { value: "SIGTSTP", text: "SIGTSTP" }, { value: "SIGTTIN", text: "SIGTTIN" }, { value: "SIGTTOU", text: "SIGTTOU" }, { value: "SIGURG", text: "SIGURG" }, { value: "SIGXCPU", text: "SIGXCPU" }, { value: "SIGXFSZ", text: "SIGXFSZ" }, { value: "SIGVTALRM", text: "SIGVTALRM" }, { value: "SIGPROF", text: "SIGPROF" }, { value: "SIGWINCH", text: "SIGWINCH" }, { value: "SIGPOLL", text: "SIGPOLL" }, { value: "SIGIO", text: "SIGIO" }, { value: "SIGPWR", text: "SIGPWR" }, { Value: "SIGSYS", text: "SIGSYS" }] }] }, { type: "combo", name: "priority", label: "Priority", labelWidth: 140, options: [{ value: "idle", text: "idle" }, { value: "below_normal", text: "below_normal" }, { value: "normal", text: "normal" }, { value: "above_normal", text: "above_normal" }, { value: "high", text: "high" }] }, { type: "select", name: "visible", label: "Visible", labelWidth: 140, options: [{ value: "yes", text: "yes" }, { value: "no", text: "no" }, { value: "never", text: "never" }] }, { type: "input", name: "minTasks", label: "Min tasks", labelWidth: 140 }, { type: "input", name: "tasks", label: "Tasks", labelWidth: 140 }, { type: "block", name: "form_block_2", list: [{ type: "input", name: "timeout", label: "Timeout", labelWidth: 140 }, { type: "newcolumn" }, { type: "label", name: "form_label_5", label: "hh:mm:ss" }] }, { type: "block", name: "form_block_3", list: [{ type: "input", name: "idleTimeout", label: "Idle Timeout", labelWidth: 140 }, { type: "newcolumn" }, { type: "label", name: "form_label_2", label: "hh:mm:ss or hh:mm or ss or never" }] }, { type: "block", name: "form_block_4", list: [{ type: "input", name: "warnIfLongerThan", label: "Warn if longer than", labelWidth: 140 }, { type: "newcolumn" }, { type: "label", name: "form_label_3", label: "hh:mm:ss or percentage" }] }, { type: "block", name: "form_block_5", list: [{ type: "input", name: "warnIfShorterThan", label: "Warn if shorter than", labelWidth: 140 }, { type: "newcolumn" }, { type: "label", name: "form_label_4", label: "hh:mm:ss or percentage" }] }, { type: "checkbox", name: "forceIdleTimeout", label: "Force Idle Timeout", labelWidth: 140 }];
		var obj = this.main.attachForm(str);

		var signalToAPI = function signalToAPI(val) {
			var res = val.split(' ');
			if (res.length == 1 && res[0] == "") return [];else return res;
		};

		var signalToForm = function signalToForm(data) {
			return data.join(' ');
		};

		var fields = [{ 'name': 'jobScheduler.name' }, { 'name': 'javaOptions' }, { 'name': 'ignoreSignals', 'toAPI': signalToAPI, 'toForm': signalToForm }, { 'name': 'priority' }, { 'name': 'visible' }, { 'name': 'minTasks' }, { 'name': 'tasks' }, { 'name': 'timeout' }, { 'name': 'idleTimeout' }, { 'name': 'warnIfLongerThan' }, { 'name': 'warnIfShorterThan' }, { 'name': 'forceIdleTimeout' }];

		this.form = new Form(obj, fields, this.binder);

		obj.attachEvent('onButtonClick', function (name, command) {
			if (name === 'add_signal') {
				var signals = obj.getItemValue('ignoreSignals');
				signals += " ";
				signals += obj.getItemValue('signal_select');

				this.form.setFieldValue('ignoreSignals', signals);
			}
		}.bind(this));
	};

	var build = function build(binder) {
		var view = new Options(binder);
		return view;
	};

	joe.loader.finished(build);
})();