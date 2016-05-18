joe.loader.load('templates/default_entity_adder', function(DefaultEntityAdder) {
joe.loader.load('utils/binder/standalone_binder', function(StandaloneBinder) {

	var rowDesc = [
		{ name: 'name', label: 'Name'},
		{ name: 'ordersRecoverable', label: 'Order Recoverable',
		  format: x => x ? 'yes' : 'no'
		},
		{ name: 'visible', label: 'Visible',  format: x => x ? 'yes' : 'no'}
	];

	function uniqueName(grid)
	{
		var i = 1;

		while(true)
		{
			var name = "jobChain" + String(i);
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

	function newChain(adder)
	{
		var name = uniqueName(adder.grid.grid);
		adder.grid.create({
			name: name
		});
	}


	function delChain(adder)
	{
		if (adder.selected != null)
		{
			adder.grid.remove(adder.selected);
		}
	}

	function paramChain(adder)
	{
		if (adder.selected != null)
		{
			console.log("Load params of: ", adder.selected);
		}
	}


	var controlDesc = [
		{ label:"New Job Chain", action: newChain},
		{ label:"Remove Job Chain", action: delChain},
		{ label:"Parameter", action: paramChain}
	];

	var build = function(binder) {
		var view = new DefaultEntityAdder('jobChain', rowDesc,
										  controlDesc, binder);

		return view;
	}

	joe.loader.finished(build);
})
});
