'use strict';

joe.loader.load('templates/default_entity_adder', function (DefaultEntityAdder) {
	joe.loader.load('utils/binder/entity_binder', function (EntityBinder) {

		function hasSuccess(grid) {
			var exist = false;
			grid.forEachRow(function (rid) {
				if (grid.cellById(rid, 0).getValue() == 'success') exist = true;
			});

			return exist;
		}

		function hasError(grid) {
			var exist = false;
			grid.forEachRow(function (rid) {
				if (grid.cellById(rid, 0).getValue() == 'error') exist = true;
			});

			return exist;
		}

		function genExitCode(grid) {
			if (!hasSuccess(grid)) {
				return 'success';
			}
			if (!hasError(grid)) {
				return 'error';
			}

			var i = 1;
			while (true) {
				var exists = false;
				grid.forEachRow(function (rid) {
					if (grid.cellById(rid, 0).getValue() == i) exists = true;
				});

				if (!exists) {
					return String(i);
				}
				++i;
			}
		}

		function newCommand(adder) {
			adder.grid.create({
				onExitCode: genExitCode(adder.grid.grid)
			});
		}

		function removeCommand(adder) {
			if (adder.selected != null) {
				adder.grid.remove(adder.selected);
			}
		}

		var rowDesc = [{ name: 'onExitCode', label: 'Exitcode' }];

		var ctrlDesc = [{ label: 'New Command', action: newCommand }, { label: 'Remove Command', action: removeCommand }];

		var build = function build(binder) {
			var view = new DefaultEntityAdder('commands', rowDesc, ctrlDesc, binder);
			return view;
		};

		joe.loader.finished(build);
	});
});