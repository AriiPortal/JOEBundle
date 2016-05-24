'use strict';

joe.loader.load('templates/default_entity_adder', function (DefaultEntityAdder) {
	joe.loader.load('utils/binder/entity_binder', function (EntityBinder) {

		var rowDesc = [{ name: 'name', label: 'Name' }, { name: 'ordering', label: 'Ordering' }];

		function uniqueOrdering(grid) {
			var i = 0;
			while (true) {
				var exists = false;

				grid.forEachRow(function (rid) {
					if (grid.cellById(rid, 1).getValue() == i) exists = true;
				});

				if (!exists) {
					return i;
				}

				++i;
			}
		}

		function newProcess(adder) {
			var ordering = uniqueOrdering(adder.grid.grid);
			var name = 'process' + String(ordering);
			adder.grid.create({
				name: name,
				ordering: ordering
			});
		}

		function delProcess(adder) {
			if (adder.selected != null) adder.grid.remove(adder.selected);
		}

		var controlDesc = [{ label: "New", action: newProcess }, { label: "Remove", action: delProcess }];

		var build = function build(binder) {
			var view = new DefaultEntityAdder('monitor', rowDesc, controlDesc, binder);

			view.init = function () {
				view.grid.onDoubleClick = function (data) {
					joe.view.load('views/job/processing/process', data.binder);
				};
			};

			return view;
		};

		joe.loader.finished(build);
	});
});