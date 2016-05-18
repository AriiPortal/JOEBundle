joe.loader.load('templates/default_entity_adder', function(DefaultEntityAdder) {
joe.loader.load('utils/binder/entity_binder', function(EntityBinder) {

	var rowDesc = [
		{ name: 'name', label: 'Name' },
		{ name: 'ordering', label: 'Ordering' }
	];

	function uniqueOrdering(entities)
	{
		var  i = 0;
		while (true)
		{
			var exists = false;

			for (var key in entities)
			{
				if (entities[key].ordering == i)
				{
					exists = true;
					break;
				}
			}

			if (!exists)
			{
				return i;
			}

			++i;
		}
	}

	function newProcess(adder)
	{
		var ordering = uniqueOrdering(adder.grid.entities);
		var name = 'process' + String(ordering);
		adder.grid.create({
			name: name,
			ordering: ordering
		});
	}


	function delProcess(adder)
	{
		if (adder.selected != null)
			adder.grid.remove(adder.selected);
	}

	var controlDesc = [
		{ label:"New", action: newProcess},
		{ label:"Remove", action: delProcess}
	];

	var build = function(binder) {
		var view = new DefaultEntityAdder('monitor', rowDesc, controlDesc, binder);

		view.destroy = function() {
			binder.destroy();
		}

		return view;
	}

	joe.loader.finished(build);
})
});
