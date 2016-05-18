joe.loader.load('templates/default_entity_adder', function(DefaultEntityAdder) {
joe.loader.load('utils/binder/standalone_binder', function(StandaloneBinder) {

	var rowDesc = [
		{ name: 'name', label: 'Name'}
	];

	function uniqueName(entities)
	{
		var i = 1;

		while(true)
		{
			var name = String(i);
			var exists = false;

			for (var key in entities)
			{
				if (entities[key].name === name)
				{
					exists = true;
					break;
				}
			}

			if (!exists)
				return name;

			i++;
		}
	}

	function newOrder(adder)
	{
		var name = uniqueName(adder.grid.entities);
		adder.grid.create({
			name: name
		}, function(data) {
			if (!joe.tree.orders.loaded)
				joe.tree.orders.loadChildren();
			else
				joe.tree.orders.add(data);
		});
	}


	function delOrder(adder)
	{
		if (adder.selected != null)
		{
			adder.grid.remove(adder.selected, function(data) {
				joe.tree.orders.remove(data.id);
			});
		}
	}

	var controlDesc = [
		{ label:"New Order", action: newOrder},
		{ label:"Remove Order", action: delOrder}
	];

	var build = function(binder) {
		var view = new DefaultEntityAdder('order', rowDesc, controlDesc, binder);

		view.destroy = function() {
			binder.destroy();
		}

		return view;
	}

	joe.loader.finished(build);
})
});
