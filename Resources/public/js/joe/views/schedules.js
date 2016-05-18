joe.loader.load('templates/default_entity_adder', function(DefaultEntityAdder) {
joe.loader.load('utils/binder/standalone_binder', function(StandaloneBinder) {
	var rowDesc = [
		{ name: 'name', label: 'Name'}
	];

	function uniqueName(grid)
	{
		var i = 1;

		while(true)
		{
			var name = 'schedule' + String(i);
			var exists = false;

			grid.forEachRow(function (rid) {
				if (grid.cellById(rid, 0).getValue() == name)
					exists = true;
			});

			if (!exists)
				return name;

			i++;
		}
	}

	function newSchedule(adder)
	{
		var name = uniqueName(adder.grid.grid);
		adder.grid.create({
			name: name
		}, function(data) {
			if (!joe.tree.schedules.loaded)
				joe.tree.schedules.loadChildren();
			else
				joe.tree.schedules.add(data);
		});
	}


	function delSchedule(adder)
	{
		if (adder.selected != null)
		{
			adder.grid.remove(adder.selected, function(data) {
				joe.tree.schedules.remove(data.id);
			});
		}
	}

	var controlDesc = [
		{ label:"New Schedule", action: newSchedule},
		{ label:"Remove", action: delSchedule}
	];

	var build = function(binder) {
		var view = new DefaultEntityAdder('schedule', rowDesc, controlDesc, binder);
		return view;
	}

	joe.loader.finished(build);
})
});
