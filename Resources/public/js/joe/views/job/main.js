(function() {
	/* ############# TAB SCRIPT ############# */
	function tabScript (binder) {
		this.binder = binder;
	}

	tabScript.prototype = new View();

	tabScript.prototype.setup = function (parent) {
		var formDesc = [
			{ type:"combo", name:"tab_script_combo", label:"Function-/Code-Snippets", labelWidth:150, inputWidth:140 },
			{ type:"input", name:"script.code", rows:"10", inputWidth:600 }
		];

		var fields = [
			/*{ 'name': 'tab_script_combo', 'type': 'combo', 'default': 'not implemented yet' }
			,*/ { 'name': 'script.code' }
		]

		var obj = parent.attachForm(formDesc);
		this.form = new Form(obj, fields, this.binder);
	}

	tabScript.prototype.destroy = function () {
		this.form.destroy();
	}

	/* ############# TAB INCLUDES ############# */
	function tabIncludes (binder) {
		this.binder = binder;
	}

	tabIncludes.prototype = new View();

	tabIncludes.prototype.setup = function (parent) {
		var str = [
			{ type:"block", name:"block1", list:[
				{ type:"checkbox", name:"tab_includes_hfcb" },
				{ type:"newcolumn" },
				{ type:"input", name:"tab_includes_hfinput", label:"from Hot Folder", labelAlign:"left" }
			] },
			{ type:"container", name:"container", inputWidth:400, inputHeight:200 },
			{ type:"newcolumn" },
			{ type:"block", name:"block2", list:[
				{ type:"button", name:"new", value:"New", width:"150" },
				{ type:"button", name:"add", value:"Add File", width:"150" },
				{ type:"button", name:"remove", value:"Remove File", width:"150" }
			] }
		];
		var obj = parent.attachForm(str);
		var grid = new dhtmlXGridObject(obj.getContainer('container'));
		var fields = [
			/*{ 'name': 'tab_includes_hfcb', 'type': 'checkbox', 'default': false }
			, { 'name': 'tab_includes_hfinput', 'default': 'not implemented yet' }*/
		];

		this.form = new Form(obj, fields, this.binder);

		grid.setHeader(["Name","File / Live File"]);
		grid.setColTypes("ro,ro");
		grid.setColSorting('str,str');
		grid.setInitWidths('*,*');
		grid.init();

	}

	tabIncludes.prototype.destroy = function () {
		this.form.destroy();
	}

	/* ############# TAB OPTIONS ############# */
	function tabOptions (binder) {
		this.binder = binder;
	}

	tabOptions.prototype = new View();

	tabOptions.prototype.setup = function (parent) {
		var str = [
			{ type:"block" , name:"form_block_1", list:[
				{ type:"label", name:"form_label_1", label:"Job Chain Job" },
				{ type:"newcolumn" },
				{ type:"radio", name:"chainJob", label:"Yes", value:"yes", position:"label-right" },
				{ type:"newcolumn" },
				{ type:"radio", name:"chainJob", label:"No", value:"no", position:"label-right" },
				{ type:"newcolumn" },
				{ type:"checkbox", name:"stopOnError", label:"Stop On Error" }
			] },
			{ type:"combo", name:"logLevel", label:"Log Level", labelWidth:150, inputWidth:140 },
			{ type:"combo", name:"stdErrLogLevel", label:"StdErr Loglevel", labelWidth:150, inputWidth:140 },
			{ type:"combo", name:"history", label:"History", labelWidth:150, inputWidth:140 },
			{ type:"combo", name:"historyOnProcess", label:"History on Process", labelWidth:150, inputWidth:140 },
			{ type:"combo", name:"historyWithLog", label:"History With Log", labelWidth:150, inputWidth:140 },
			{ type:"block", name:"form_block_2", list:[
				{ type:"input", name:"ignoreSignals", label:"Ignore Signals", labelWidth:150  },
				{ type:"newcolumn" },
				{ type:"button", name:"add_signal", value:"<- Add <-"  },
				{ type:"newcolumn" },
				{ type:"combo", name:"signal_select", inputWidth:140,
				  options:[
					  { value:"SIGHUP", text:"SIGHUP"},
					  { value:"SIGINT", text:"SIGINT"},
					  { value:"SIGQUIT", text:"SIGQUIT"},
					  { value:"SIGILL", text:"SIGILL"},
					  { value:"SIGTRAP", text:"SIGTRAP"},
					  { value:"SIGABRT", text:"SIGABRT"},
					  { value:"SIGIOT", text:"SIGIOT"},
					  { value:"SIGBUS", text:"SIGBUS"},
					  { value:"SIGFPE", text:"SIGFPE"},
					  { value:"SIGKILL", text:"SIGKILL"},
					  { value:"SIGUSR1", text:"SIGUSR1"},
					  { value:"SIGSEGV", text:"SIGSEGV"},
					  { value:"SIGUSR2", text:"SIGUSR2"},
					  { value:"SIGPIPE", text:"SIGPIPE"},
					  { value:"SIGALRM", text:"SIGALRM"},
					  { value:"SIGTERM", text:"SIGTERM"},
					  { value:"SIGSTKFLT", text:"SIGSTKFLT"},
					  { value:"SIGCHLD", text:"SIGCHLD"},
					  { value:"SIGCONT", text:"SIGCONT"},
					  { value:"SIGSTOP", text:"SIGSTOP"},
					  { value:"SIGTSTP", text:"SIGTSTP"},
					  { value:"SIGTTIN", text:"SIGTTIN"},
					  { value:"SIGTTOU", text:"SIGTTOU"},
					  { value:"SIGURG", text:"SIGURG"},
					  { value:"SIGXCPU", text:"SIGXCPU"},
					  { value:"SIGXFSZ", text:"SIGXFSZ"},
					  { value:"SIGVTALRM", text:"SIGVTALRM"},
					  { value:"SIGPROF", text:"SIGPROF"},
					  { value:"SIGWINCH", text:"SIGWINCH"},
					  { value:"SIGPOLL", text:"SIGPOLL"},
					  { value:"SIGIO", text:"SIGIO"},
					  { value:"SIGPWR", text:"SIGPWR"},
					  { Value:"SIGSYS", text:"SIGSYS"}
				  ] }
			] },
			{ type:"combo", name:"priority", label:"Priority", labelWidth:150, inputWidth:140, options:[
				{ value:"idle", text:"idle" },
				{ value:"below_normal", text:"below_normal"},
				{ value:"normal", text:"normal"},
				{ value:"above_normal", text:"above_normal"},
				{ value:"high", text:"high"}
			]  },
			{ type:"select", name:"visible", label:"Visible", labelWidth:150, inputWidth:140, options:[
				{text: "yes", value: "yes"},
				{text: "no", value: "no"},
				{text: "never", value: "never"}
			]},
			{ type:"input", name:"minTasks", label:"Min Tasks", labelWidth:150  },
			{ type:"input", name:"tasks", label:"Tasks", labelWidth:150  },
			{ type:"block", name:"form_block_3", list:[
				{ type:"input", name:"timeout", label:"Timeout", labelWidth:150 },
				{ type:"newcolumn" },
				{ type:"label", name:"form_label_5", label:"hh:mm:ss" }
			] },
			{ type:"block", name:"form_block_4", list:[
				{ type:"input", name:"idleTimeout", label:"Idle Timeout", labelWidth:150 },
				{ type:"newcolumn" },
				{ type:"label", name:"form_label_2", label:"hh:mm:ss or hh:mm or ss or never" }
			] },
			{ type:"block", name:"form_block_5", list:[
				{ type:"input", name:"warnIfLongerThan", label:"Warn if longer than", labelWidth:150 },
				{ type:"newcolumn" },
				{ type:"label", name:"form_label_3", label:"hh:mm:ss or percentage" }
			] },
			{ type:"block", name:"form_block_6", list:[
				{ type:"input", name:"warnIfShorterThan", label:"Warn if shorter than", labelWidth:150 },
				{ type:"newcolumn" },
				{ type:"label", name:"form_label_4", label:"hh:mm:ss or percentage" }
			] },
			{ type:"checkbox" , name:"forceIdleTimeout", label:"Force Idle Timeout", labelWidth:150 }
		];
		var obj = parent.attachForm(str);

		var signalToAPI = function(val) {
			var res = val.split(' ');
			if (res.length == 1 && res[0] == "")
				return [];
			else
				return res;
		}

		var signalToForm = function (data) {
			return data.join(' ');
		}

		var fields = [
			{ 'name': 'stopOnError', 'type': 'checkbox' }
			/*, { 'name': 'logLevel', 'type': 'combo', 'default': 'not implemented yet' }
			, { 'name': 'stdErrLogLevel', 'type': 'combo', 'default': 'not implemented yet' }
			, { 'name': 'history', 'type': 'combo', 'default': 'not implemented yet' }
			, { 'name': 'historyOnProcess', 'type': 'combo', 'default': 'not implemented yet' }
			, { 'name': 'historyWithLog', 'type': 'combo', 'default': 'not implemented yet' }*/
			, { 'name': 'ignoreSignals', 'toAPI': signalToAPI, 'toForm': signalToForm}
			, { 'name': 'priority', 'type': 'combo' }
			, { 'name': 'visible'}
			, { 'name': 'tasks' }
			, { 'name': 'minTasks' }
			, { 'name': 'timeout' }
			, { 'name': 'idleTimeout' }
			, { 'name': 'warnIfLongerThan' }
			, { 'name': 'warnIfShorterThan' }
			, { 'name': 'forceIdleTimeout', 'type': 'checkbox' }
		];

		this.form = new Form(obj, fields, this.binder);

		obj.attachEvent('onButtonClick', function(name, command) {
			if (name === 'add_signal')
			{
				var signals = obj.getItemValue('ignoreSignals');
				signals += " "
				signals += obj.getItemValue('signal_select');


				this.form.setFieldValue('ignoreSignals', signals);
			}
		}.bind(this));
	}

	tabOptions.prototype.destroy = function () {
		this.form.destroy();
	}

	/* ############# TAB EMAIL ############# */
	function tabEmail (binder) {
		this.binder = binder;
	}

	tabEmail.prototype = new View();

	tabEmail.prototype.setup = function (parent) {
		var str = [
			{ type:"select", name:"onError", label:"Mail on error", labelWidth:150, inputWidth:140 },
			{ type:"select", name:"onWarning", label:"Mail on Warning", labelWidth:150, inputWidth:140 },
			{ type:"select", name:"onSuccess", label:"Mail on Success", labelWidth:150, inputWidth:140 },
			{ type:"select", name:"onProcess", label:"Mail on Process", labelWidth:150, inputWidth:140 },
			{ type:"select", name:"onDelay", label:"Mail on Delay after Error", labelWidth:150, inputWidth:140 },
			{ type:"input", name:"to", label:"Mail To", labelWidth:150 },
			{ type:"input", name:"cc", label:"Mail CC", labelWidth:150 },
			{ type:"input", name:"bcc", label:"Mail BCC", labelWidth:150 }
		];
		var obj = parent.attachForm(str);
		var fields = [];
		this.form = new Form(obj, fields, this.binder);
	}

	tabEmail.prototype.destroy = function () {
		this.form.destroy();
	}

	/* ############# TAB ONERROR ############# */
	function tabOnError (binder) {
		this.binder = binder;
	}

	tabOnError.prototype = new View();

	tabOnError.prototype.setup = function (parent) {
		var str = [
			{ type:"block", name:"form_block_1", list:[
				{ type:"input", name:"errorCount", label:"Error Count", disabled:true },
				{ type:"newcolumn" },
				{ type:"radio", name:"action", label:"Stop", value:"stop", disabled:true, position:"label-right" },
				{ type:"newcolumn" },
				{ type:"radio", name:"action", label:"Delay", value:"delay", disabled:true, position:"label-right" },
				{ type:"newcolumn" },
				{ type:"input", name:"hh", labelAlign:"left", inputWidth:30, disabled:true },
				{ type:"newcolumn" },
				{ type:"label", name:"form_label_1", label:":" },
				{ type:"newcolumn" },
				{ type:"input", name:"mm", inputWidth:30, disabled:true },
				{ type:"newcolumn" },
				{ type:"label", name:"form_label_2", label:":" },
				{ type:"newcolumn" },
				{ type:"input", name:"ss", inputWidth:30, disabled:true },
				{ type:"newcolumn" },
				{ type:"label", name:"label", label:"[hh:mm:]ss" }
			] },
			{ type:"container", name:"container", inputWidth:400, inputHeight:200 },
			{ type:"newcolumn" },
			{ type:"button", name:"apply", value:"Apply Delay", width:"125" },
			{ type:"button", name:"new", value:"New Delay", width:"125" },
			{ type:"button", name:"remove", value:"Remove Delay", width:"125" }
		];
		var obj = parent.attachForm(str);
		var grid = new dhtmlXGridObject(obj.getContainer('container'));
		var fields = [];

		grid.setHeader(["Error Count","Delay [hh:mm:]ss"]);
		grid.setColTypes("ro,ro");
		grid.setColSorting('str,str');
		grid.setInitWidths('*,*');
		grid.init();

		this.form = new Form(obj, fields, this.binder);
	}

	tabOnError.prototype.destroy = function () {
		this.form.destroy();
	}

	/* ############# TAB FILEWATCHER ############# */
	function tabFileWatcher (binder) {
		this.binder = binder;
	}

	tabFileWatcher.prototype = new View();

	tabFileWatcher.prototype.setup = function (parent) {
		var str = [
			{ type:"block" , name:"form_block_1", list:[
				{ type:"input", name:"watchDirectory", label:"Watch Directory" },
				{ type:"newcolumn" },
				{ type:"input", name:"fileRegex", label:"File Regex" }
			] },
			{ type:"container", name:"container", inputWidth:400, inputHeight:200 },
			{ type:"newcolumn" },
			{ type:"button", name:"apply", value:"Apply Dir", width:"125" },
			{ type:"button", name:"new", value:"New Dir", width:"125" },
			{ type:"button", name:"remove", value:"Remove Dir", width:"125" }
		];
		var obj = parent.attachForm(str);
		var grid = new dhtmlXGridObject(obj.getContainer('container'));
		var fields = [];

		grid.setHeader(["Directory","Regex"]);
		grid.setColTypes("ro,ro");
		grid.setColSorting('str,str');
		grid.setInitWidths('*,*');
		grid.init();

		this.form = new Form(obj, fields, this.binder);
	}

	tabFileWatcher.prototype.destroy = function () {
		this.form.destroy();
	}

	/* ############# TAB DOCUMENTATION ############# */
	function tabDocumentation (binder) {
		this.binder = binder;
	}

	tabDocumentation.prototype = new View();

	tabDocumentation.prototype.setup = function (parent) {
		var str = [
			{ type:"fieldset", name:"fieldsetComment", label:"Comment", list: [
				{ type:"input", name:"comment", label:"", rows:"5" }
			]},
			{ type:"fieldset", name:"fieldsetDescription", label:"Job Description", list: [
				{ type:"input", name:"description", label:"" },
				{ type:"input", name:"content", label:"", rows:"5" },
				{ type:"newcolumn" },
				{ type:"checkbox", name:"inLiveFolder", label:"in Live Folder", position:"label-right" },
				{ type:"button", name:"show", value:"Show", width:"125" },
				{ type:"button", name:"open", value:"Open", width:"125" },
				{ type:"button", name:"wizard", value:"Wizard", width:"125" }
			]}
		];
		var obj = parent.attachForm(str);
		var fields = [];
		this.form = new Form(obj, fields, this.binder);
	}

	tabDocumentation.prototype.destroy = function () {
		this.form.destroy();
	}

	/* ############# TAB XML ############# */
	function tabXML (binder) {
		this.url = binder.route.xml;
	}

	tabXML.prototype = new View();

	tabXML.prototype.setup = function (parent) {
		var str = [
			{ type: 'input', name: 'xml', label: '', rows: '25' }
		];
		this.form = parent.attachForm(str);

		/**
		 * hack in order to fully expend the textarea
		 */
		var textarea = this.form.getInput('xml');
		var parent1 = textarea.parentNode;
		var parent2 = parent1.parentNode.parentNode;
		parent1.style.width = '100%';
		parent2.style.width = '100%';
		textarea.style.width = '100%';
	}

	tabXML.prototype.reload = function() {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", this.url, true);
		xhr.send();

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200)
			{
				this.form.setItemValue('xml', xhr.responseText);
			}
		}.bind(this);
	}

	tabXML.prototype.destroy = function () {

	}

	/* ############# MAIN ############# */
	function Main(binder)
	{
		this.binder = binder;
		this.tabViews = {};
	}

	Main.prototype = new View();

	Main.prototype.onDataUpdate = function(data) {
		this.cellGeneral.setText(data.name);
	}

	Main.prototype.init = function() {
		var selector = {name:true};

		var update = function (data) {
			this.cellGeneral.setText(data.name);
		}.bind(this);

		var callbacks = {
			onInit: update,
			onUpdate: update
		}

		this.binder.register(this, callbacks, selector)
	}

	Main.prototype.setup = function (parent) {
		var layout = parent.attachLayout('2E');
		this.cellGeneral = layout.cells('a');
		this.cellExtras = layout.cells('b');
		var tabbar = this.cellExtras.attachTabbar();

		this.cellGeneral.setHeight(200);

		var formJson = [
			{ type:"input", name:"name", label:"Job Name", labelWidth:150 },
			{ type:"input", name:"title", label:"Job Title", labelWidth:150 },
			{ type:"block", name:"block", list:[
				{ type:"label", name:"label", label:"Process Class" },
				{ type:"newcolumn" },
				{ type:"button", name:"arrow", value:">" },
				{ type:"newcolumn" },
				{ type:"combo", name:"processClass", inputWidth:140},
				{ type:"newcolumn" },
				{ type:"button", name:"showDir", value:"Show Dir" }
			] },
			{ type:"combo" , name:"script.language", label:"Language", labelWidth:150, inputWidth:140, options:[
				{ value:"shell", text:"shell" },
				{ value:"java", text:"java" },
				{ value:"javascript", text:"javascript" },
				{ value:"VBScript", text:"VBScript" },
				{ value:"perlScript", text:"perlSCript" },
				{ value:"javax.script:rhino", text:"javax.script:rhino" },
				{ value:"javax.script:ecmascript", text:"javax.script:ecmascript" },
				{ value:"java:javascript", text:"java:javascript" }
			] }
		];

		var obj = this.cellGeneral.attachForm(formJson);

		var fields = [
			{ 'name': 'name' }
			, { 'name': 'title' }
			, { 'name': 'script.language', 'default': 'shell'}
			, { 'name': 'processClass', type: 'combo' }
		];

		this.form = new Form(obj, fields, this.binder);

		this.cellGeneral.setText(this.binder.data.name);
		this.cellExtras.hideHeader();

		var tabs = [
			{
				id: 'script',
				label: 'Script',
				view: tabScript
			},
			{
				id: 'includes',
				label: 'Includes',
				view: tabIncludes
			},
			{
				id: 'options',
				label: 'Options',
				view: tabOptions
			},
		/* EMAIL DOES NOT HAVE AN ENTITY YET
		   {
				id: 'email',
				label: 'eMail',
				view: tabEmail
			},
		*/
			{
				id: 'onerror',
				label: 'onError',
				view: tabOnError
			},
			{
				id: 'filewatcher',
				label: 'File Watcher',
				view: tabFileWatcher
			},
			{
				id: 'documentation',
				label: 'Documentation',
				view: tabDocumentation
			},
			{
				id: 'xml',
				label: 'XML',
				view: tabXML
			}
		];

		for (var i = 0; i < tabs.length; i++)
		{
			var t = tabs[i];
			tabbar.addTab(t.id, t.label);
			var view = new t.view(this.binder);
			var parent = tabbar.tabs(t.id);

			if (i == 0)
				parent.setActive();

			view.setup(parent);
			view.init();
			this.tabViews[t.id] = view;
		}

		this.form.onChange = function (id, value, checked) {
			if (tabbar.getActiveTab() === 'xml' &&
				this.tabViews.hasOwnProperty('xml'))
			{
				this.tabViews.xml.reload();
			}
		}.bind(this);

		tabbar.attachEvent("onSelect", function(id, last){
			if (id == 'xml' && this.tabViews.hasOwnProperty('xml'))
			{
				this.tabViews.xml.reload();
			}

			return true;
		}.bind(this));

	}

	Main.prototype.destroy = function () {
		for (var key in this.tabViews) {
			this.tabViews[key].destroy();
		}

		this.binder.unregister(this);
		this.form.destroy();
	}


	var build = function(binder) {
		var view = new Main(binder);
		return view;
	}

	joe.loader.finished(build);
})();
