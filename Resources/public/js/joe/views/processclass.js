joe.loader.load('templates/form_entity_adder', function (FormEntityAdder) {
joe.loader.load('utils/binder/data_binder', function (DataBinder) {
joe.loader.load('utils/binder/entity_binder', function (EntityBinder) {

	function pClassToForm(form, data)
	{
		var name = '';
		var max = 0;
		var scheduler = '';

		if (data != null)
		{
			name = data.name;
			max = data.maxProcesses;
			scheduler = data.remoteScheduler;	

			setCurrentPClass(data.id).bind(this);

			freeRScheds().bind(this);
			cleanView().bind(this);

			allocateRScheds().bind(this);
			setupRSchedsView().bind(this);
		}

		form.setItemValue('name', name);
		form.setItemValue('maxProcesses', max);
		form.setItemValue('remoteScheduler', scheduler);
		
	}

	function formToPClass(form)
	{
		var name = form.getItemValue('name');
		var maxProcesses = parseInt(form.getItemValue('maxProcesses'));
		var remoteScheduler = form.getItemValue('remoteScheduler');
		
		return {
			name: name == null ? '' : name,
			maxProcesses: isNaN(maxProcesses) ? 0 : maxProcesses,
			remoteScheduler: remoteScheduler == null ? '' : remoteScheduler
		};
	}

	function rSchedToForm(form, data)
	{
		var scheduler = '';
		var timeout = 0;
		var period = 0;

		if (data != null)
		{
			scheduler = data.remoteScheduler;
			timeout = data.httpHeartbeatTimeout;
			period = data.httpHeartbeatPeriod;
		}

		form.setItemValue('remoteScheduler', scheduler);
		form.setItemValue('httpHeartbeatTimeout', timeout);
		form.setItemValue('httpHeartbeatPeriod', period);

		this.rScheds.selected = true;
	}

	function formToRSched(form)
	{
		this.rScheds.selected = false;
		var scheduler = form.getItemValue('remoteScheduler');
		var timeout = parseInt(form.getItemValue('httpHeartbeatTimeout'));
		var period = parseInt(form.getItemValue('httpHeartbeatPeriod'));

		return {
			remoteScheduler: scheduler,
			httpHeartbeatTimeout: isNaN(timeout) ? 0 : timeout,
			httpHeartbeatPeriod: isNaN(period) ? 0 : period
		};
	}

	function newPClass(adder)
	{
		adder.enableForm();
	}

	function applyPClass(adder)
	{
		if (this.pClasses.current == null)
			adder.create();
		else
			adder.update();
	}

	function removePClass(adder)
	{
		adder.remove();
	}

	function newRSched(adder)
	{
		adder.enableForm();
	}

	function applyRSched(adder)
	{
		if (this.rScheds.selected)
			adder.update();
		else
			adder.create();
	}

	function removeRSched(adder)
	{
		adder.remove();
	}
	
	function freeRScheds()
	{
		this.rScheds.binder.destroy();
		this.rScheds.binder = null;
	}

	function cleanView()
	{
		this.cells.bottom.collapse();
		this.cells.bottom.detachObject(true);
		this.rScheds.view.destroy();
		this.rScheds.view = null;
	}
	
	function setCurrentPClass(id)
	{
		this.pClasses.current = new DataBinder('processClass',
											   id,
											   { remoteScheduler: true },
											   null
		);
	}
	
	function allocateRScheds()
	{
		this.rScheds.binder = new EntityBinder('remoteScheduler',
											   this.pClasses.current,
											   'remoteSchedulerCollection'
		);
	}

	function setupRSchedsView()
	{
		this.rScheds.view = new FormEntityAdder('remoteScheduler',
												this.desc.rScheds.rows,
												rSchedsToForm.bind(this),
												formToRSched.bind(this),
												this.desc.rScheds.form,
												this.desc.rScheds.controls,
												this.rScheds.binder
		);
		this.rScheds.view.setup(this.cells.bottom);
		this.rScheds.view.init();
		this.cells.bottom.expand();
	}
	
	var build = function build(binder)
	{
		var view = new View();
		view.setup = function (parent)
		{
			this.desc = {
				pClasses:
				{
					rows:
					[
						{ name: 'name', label: 'Process Class', format: (x => { return x == '' ? '<empty>' : x; }) },
						{ name: 'maxProcesses', label: 'Max Processes' },
						{ name: 'remoteScheduler', label: 'Host' }
					],

					controls:
					[
						{ label: 'Apply', action: applyPClass.bind(this) },
						{ label: 'New Process Class', action: newPClass },
						{ label: 'Remove Process Class', action: removePClass }
					],

					form:
					[

						{ type: 'input', name: 'name', label: 'Process Class' },
						{ type: 'input', name: 'maxProcesses', label: 'Max Processes' },
						{ type: 'input', name: 'remoteScheduler', label: 'Url' },
						{ type: 'select', name: '', label: 'Select', options:
						  [
							  { text: 'first', value: 'first' },
									{ text: 'next', value: 'next' }
						  ]
						}
					]
				},

				rScheds:
				{
					rows:
					[
						{ name: 'remoteScheduler', label: 'Url' },
						{ name: 'httpHeartbeatTimeout', label: 'Heartbeat Timeout' },
						{ name: 'httpHeartbeatPeriod', label: 'Heartbeat Period' },
					],

					controls:
					[
						{ label: 'Apply Host', action: applyRSched.bind(this) },
						{ label: 'New Host', action: newRSched },
						{ label: 'Remove Host', action: removeRSched }
					],

					form:
					[
						{ type: 'input', name: 'remoteScheduler', label: 'Url' },
						{ type: 'input', name: 'httpHeartbeatTimeout', label: 'Heartbeat Timeout' },
						{ type: 'input', name: 'httpHeartbeatPeriod', label: 'Heartbeat Period' }
					]
				}
			};

			var layout = parent.attachLayout('2E');
			var pClassesView = new FormEntityAdder('processclass',
												   this.desc.pClasses.rows,
												   pClassToForm.bind(this),
												   formToPClass.bind(this),
												   this.desc.pClasses.form,
												   this.desc.pClasses.controls,
												   binder
			);

			this.cells = {
				top: layout.cells('a'),
				bottom: layout.cells('b')
			};
			this.cells.top.hideHeader();
			this.cells.bottom.hideHeader();
			this.cells.bottom.collapse();
			
			this.pClasses = {
				view: pClassesView,
				binder: binder,
				current: null
			};

			this.rScheds = {
				view: null,
				binder: null,
				selected: false
			};			
		};

		view.init = function ()
		{
			this.pClasses.view.setup(this.cells.top);
			this.pClasses.view.init();
		};

		view.destroy = function ()
		{
			this.pClasses.view.destroy();

			if (this.pClasses.current != null)
			{
				this.pClasses.current.destroy();
			}

			if (this.rScheds.binder != null)
			{
				freeRScheds();
			}

			if (this.rScheds.view != null)
			{
				cleanView();
			}
		};

		return view;
	};

	joe.loader.finished(build);
});
});
});
