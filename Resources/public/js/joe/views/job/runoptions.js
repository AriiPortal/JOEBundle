joe.loader.load('utils/binder/entity_binder', function (EntityBinder) {
joe.loader.load('templates/form_entity_adder', function (FormEntityAdder) {
joe.loader.load('views/job/runoptions/startwhendirectorychanged', function (swdc) {
joe.loader.load('views/job/runoptions/delayorderaftersetback', function (doasb) {
joe.loader.load('templates/onerror', function (onError) {
	var build = function (fetcher) {
		var view = new View();

		view.setup = function (parent) {
			var layout = parent.attachLayout('3E');
			var first = layout.cells('a');
			var second = layout.cells('b');
			var third = layout.cells('c');

			var binder1 = new EntityBinder('startWhenDirectoryChanged',
										   fetcher,
										   'startWhenDirectoryChanged');
			var view1 = swdc(binder1);
			view1.setup(first);
			view1.init();

			var binder2 = new EntityBinder('delayOrderAfterSetBack',
										   fetcher,
										   'delayOrderAfterSetBack');
			var view2 = doasb(binder2);
			view2.setup(second);
			view2.init();

			var binder3 = new EntityBinder('delayAfterError',
										   fetcher,
										   'delayAfterError');
			var view3 = onError(binder3);
			view3.setup(third);
			view3.init();

			view.destroy = function () {
				[view1, view2, view3].map(x => x.destroy());
				[binder1, binder2, binder3].map(x => x.destroy());
			};
		};

		return view;
	};

	joe.loader.finished(build);
});
});
});
});
});
