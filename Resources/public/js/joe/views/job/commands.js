joe.loader.load('templates/default_entity_adder', function(DefaultEntityAdder) {
joe.loader.load('utils/binder/standalone_binder', function(EntityBinder) {

	function hasSuccess(entities)
	{
		for (var key in entities)
		{
			if (entities[key].onExitCode == 0
			 || entities[key].onExitCode == 'success')
			{
				return true;
			}
		}

		return false;
	}

	function hasError(entities)
	{
		for (var key in entities)
		{
			if (entities[key].onExitCode == 'error')
			{
				return true;
			}
		}

		return false;
	}

	function genExitCode(entities)
	{
		if (!hasSuccess(entities))
		{
			return 'success';
		}
		if (!hasError(entities))
		{
			return 'error';
		}

		var i = 1;
		var exists = false;
		while (true)
		{
			for (var key in entities)
			{
				if (entities[key].onExitCode == i)
				{
					exists = true;
					break;
				}
			}
			if (!exists)
			{
				return String(i);
			}
		   ++i;
		}
	}

	function newCommand(adder)
	{
		adder.grid.create({
			onExitCode: genExitCode(adder.grid.entities)
		});
	}

	function removeCommand(adder)
	{
		if (adder.selected != null)
		{
			adder.grid.remove(adder.selected);
		}
	}


	var rowDesc = [
		 { name: 'onExitCode', label: 'Exitcode' }
	];

	var ctrlDesc = [
		{ label: 'New Command', action: newCommand },
		{ label: 'Remove Command', action: removeCommand }
	];

	var build = function (binder) {
		var binder = new EntityBinder('commands', binder, 'commandsCollections');
		var view = DefaultEntityAdder('commands', rowDesc, ctrlDesc, binder);

		view.destroy = function () {
			binder.destroy();
		};
	};

	joe.loader.finished(build);
});
});
>>>>>>> 533aa722e54c423886385d709cd1c68a94bfa51d
