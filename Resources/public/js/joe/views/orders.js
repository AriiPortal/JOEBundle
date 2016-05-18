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
			var name = String(i);
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

	function newOrder(adder)
	{
		var name = uniqueName(adder.grid.grid);
		adder.grid.create({
			name: name
		});
	}


	function delOrder(adder)
	{
		if (adder.selected != null)
		{
			adder.grid.remove(adder.selected);
		}
	}

	var controlDesc = [
		{ label:"New Order", action: newOrder},
		{ label:"Remove Order", action: delOrder}
	];

	var build = function(binder) {
		var view = new DefaultEntityAdder('order', rowDesc, controlDesc, binder);

		return view;
	}

	joe.loader.finished(build);
})
});
