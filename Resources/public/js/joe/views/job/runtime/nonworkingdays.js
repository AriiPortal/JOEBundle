(function () {
	function Holidays(binder)
	{
		this.binder = binder;
		this.views = {};
	}

	Holidays.prototype = new View();

	Holidays.prototype.setup = function (parent) {
		var layout = parent.attachLayout('E2');
		var top = layout.cells('a');
		var bottom = layout.cells('b');

		joe.loader.load('templates/datepicker', function () {
			this.views.datepicker = new DatePicker(/* todo */);
			this.views.datepicker.setup(top);
		}.bind(this));

		joe.loader.load('templates/includes', function () {
			this.views.includes = new Includes(/* todo */);
			this.views.includes.setup(bottom);
		}.bind(this));
	};
})();
