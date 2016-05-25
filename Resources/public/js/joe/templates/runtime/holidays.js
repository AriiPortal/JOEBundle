joe.loader.load('templates/includes', function (includes) {
joe.loader.load('utils/binder/entity_binder', function (EntityBinder) {

	function dataToItem(data) {
		var d = data.data;
		return {
			id: d.id,
			data: d.date
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

	function buildList(binder) {
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

			var ctrlsDesc = [{ type: "button", value: "Add Date", name: "add" }, { type: "button", value: "Remove Date", name: "remove" }];

			var ctrlsForm = ctrlsCell.attachForm(ctrlsDesc);

			var formDesc = [{ type: "input", name: "year" }, { type: "newcolumn" }, { type: "input", name: "month" }, { type: "newcolumn" }, { type: "input", name: "day" }];

			var form = formCell.attachForm(formDesc);

			var now = new Date();

			form.setItemValue('year', now.getFullYear());
			form.setItemValue('month', now.getMonth() + 1);
			form.setItemValue('day', now.getDate());

			ctrlsForm.attachEvent('onButtonClick', function (name) {
				if (name == 'add') {
					var date = [form.getItemValue('year'), form.getItemValue('month'), form.getItemValue('day')].join('-');

					binder.create({
						date: date
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

	function build(binder) {
		var view = new View;


		view.setup = function(parent) {
			var layout = parent.attachLayout('2E');
			var top = layout.cells('a');
			var bot = layout.cells('b');

			this.holidaysBinder = new EntityBinder('holiday', binder, 'runtime.holidays.holidayCollection');
			this.topview = buildList(this.holidaysBinder);
			this.topview.setup(top);

			this.includesBinder = new EntityBinder('includeFile', binder, 'runtime.holidays.includeCollection')
			this.botview = includes(this.includesBinder);
			this.botview.setup(bot);
		}

		view.destroy = function() {
			this.topview.destroy();
			this.holidaysBinder.destroy();

			this.botview.destroy();
			this.includesBinder.destroy();
		}

		return view;
	}

	joe.loader.finished(build);

});
});
