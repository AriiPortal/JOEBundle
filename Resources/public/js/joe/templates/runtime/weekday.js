'use strict';

joe.loader.load('utils/entity_grid', function (EntityGrid) {

	var which = [{ label: 'first', value: 1 }, { label: 'second', value: 2 }, { label: 'third', value: 3 }, { label: 'fourth', value: 4 }, { label: 'last', value: -1 }, { label: 'second last', value: -2 }, { label: 'third last', value: -3 }, { label: 'fourth last', value: -4 }];

	var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'sunday'].map(function (day) {
		return { label: day, value: day };
	});

	function whichToString(id) {
		var which = ["Second", "Third", "Fourth"];
		if (id == 1) return 'First';else if (id == -1) return 'Last';else {
			var str = which[Math.abs(id) - 2];
			if (id < 0) str += ' Last';
			return str;
		}
	}

	function dataToItem(data) {
		var d = data.data;
		return {
			id: d.id,
			data: whichToString(d.which) + '.' + d.day
		};
	}

	function onInit(data) {
		this.list.clearAll();

		for (var key in data) {
			this.list.add(dataToItem(data[key]));
		}
	}

	function onUpdate(id, data) {
		this.list.set(id, dataToItem(data));
	}

	function onCreate(data) {
		this.list.add(dataToItem(data));
	}

	function onRemove(data) {
		this.list.remove(data.data.id);
	}

	function build(binder) {
		var view = new View();

		view.setup = function (parent) {
			var layout = parent.attachLayout('2U');
			var subLayout = layout.cells('a').attachLayout('2E');
			var formCell = subLayout.cells('a');
			var listCell = subLayout.cells('b');
			var ctrlsCell = layout.cells('b');

			formCell.setHeight(50);
			formCell.fixSize(false, true);

			ctrlsCell.setWidth(150);
			ctrlsCell.fixSize(true, false);

			formCell.hideHeader();
			ctrlsCell.hideHeader();
			listCell.hideHeader();

			var ctrlsDesc = [{ type: "button", value: "Add Weekday", name: "add" }, { type: "button", value: "Remove Weekday", name: "remove" }];

			var ctrlsForm = ctrlsCell.attachForm(ctrlsDesc);

			var formDesc = [{ type: "select", name: "which", options: which }, { type: "newcolumn" }, { type: "select", name: "day", options: days }];

			var form = formCell.attachForm(formDesc);

			ctrlsForm.attachEvent('onButtonClick', function (name) {
				if (name == 'add') {
					binder.create({
						which: form.getItemValue('which'),
						day: form.getItemValue('day')
					});
				} else if (name == 'remove') {
					var selected = this.list.getSelected(false);
					if (selected) binder.remove(selected);
				}
			}.bind(this));

			this.list = listCell.attachList({ height: 20, template: "#data#" });

			var callbacks = {
				onInit: onInit.bind(this),
				onUpdate: onUpdate.bind(this),
				onCreate: onCreate.bind(this),
				onRemove: onRemove.bind(this)
			};

			binder.register(this, callbacks, { which: true, day: true });
		};

		view.destroy = function () {
			binder.unregister(this);
		};
		return view;
	}

	joe.loader.finished(build);
});