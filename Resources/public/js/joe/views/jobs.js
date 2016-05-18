joe.loader.load('templates/default_entity_adder', function(DefaultEntityAdder) {
joe.loader.load('utils/binder/standalone_binder', function(StandaloneBinder) {

	var rowDesc = [
		{ name: 'enabled', label: 'Disabled', format: x => x ? 'no' : 'yes'},
		{ name: 'name', label: 'Name'},
		{ name: 'title', label: 'Title'},
		{ name: 'jobScheduler.name', label: 'Scheduler id'},
		{ name: 'processClass', label: 'Process class'},
		{ name: 'order', label: 'Order',  format: x => x ? 'yes' : 'no'}
	];

	function uniqueName(grid)
	{
		var i = 1;

		while(true)
		{
			var name = "job" + String(i);
			var exists = false;

			grid.forEachRow(function (rid) {
				if (grid.cellById(rid, 1).getValue() == name)
					exists = true;
			});

			if (!exists)
				return name;

			i++;
		}
	}

	function newJob(order, adder)
	{
		var name = uniqueName(adder.grid.grid);
		adder.grid.create({
			name: name,
			order: order
		});
	}

	function delJob(adder)
	{
		if (adder.selected != null)
		{
			adder.grid.remove(adder.selected);
		}
	}

	var controlDesc = [
		{ label:"New Standalone Job", action: newJob.bind(this, false)},
		{ label:"New Order Job", action: newJob.bind(this, true)},
		{ label:"Remove Job", action: delJob}
	];

	var build = function(binder) {
		var view = new DefaultEntityAdder('job', rowDesc, controlDesc, binder);

		view.init = function () {
			view.grid.onDoubleClick = function (data) {
				joe.view.load('views/job/main', data.binder);
			}
		}

		return view;
	}

	joe.loader.finished(build);
})
});
