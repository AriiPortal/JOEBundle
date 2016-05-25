'use strict';

joe.loader.load('tree/build/runtime/weekdays', function (WeekdaysNode) {
	joe.loader.load('tree/build/runtime/weekday', function (WeekdayNode) {
		joe.loader.load('tree/build/runtime/monthdays', function (MonthdaysNode) {
			joe.loader.load('tree/build/runtime/ultimos', function (UltimosNode) {
				joe.loader.load('utils/binder/entity_binder', function (EntityBinder) {

					function RuntimeNode(binder) {
						this.binder = binder;
					}

					RuntimeNode.prototype = new Node();

					function weekdays(binder) {
						var weekdaysBinder = new EntityBinder('weekdays', binder, 'runtime.weekdaysCollection');

						var node = new WeekdaysNode(weekdaysBinder);
						node.init(false, 'any Weekday');
						node.destroy = function () {
							WeekdaysNode.prototype.destroy.call(this);
							weekdaysBinder.destroy();
						};
						return node;
					}

					function monthdays(binder) {
						var monthdaysBinder = new EntityBinder('monthday', binder, 'runtime.monthdayCollection');
						var node = new MonthdaysNode(monthdaysBinder);
						node.init(false, 'Days in a Month');
						node.destroy = function () {
							MonthdaysNode.prototype.destroy.call(this);
							monthdaysBinder.destroy();
						};
						return node;
					}

					function ultimos(binder) {
						var ultimosBinder = new EntityBinder('ultimos', binder, 'runtime.ultimosCollection');
						var node = new UltimosNode(ultimosBinder);
						node.init(false, 'Ultimo');
						node.destroy = function () {
							UltimosNode.prototype.destroy.call(this);
							ultimosBinder.destroy();
						};
						return node;
					}

					function weekday(binder) {
						var weekdayBinder = new EntityBinder('monthday', binder, 'runtime.monthdayCollection');
						var node = new WeekdayNode(weekdayBinder);
						node.init(false, 'Specific Days of Week');
						node.destroy = function () {
							WeekdayNode.prototype.destroy.call(this);
							weekdayBinder.destroy();
						};
						return node;
					}

					function dateNode(binder) {
						var node = new DataNode(binder, { date: true });

						node.onClick = function () {
							joe.view.load('templates/runtime/periods', binder);
						};

						node.receive = function (data) {
							node.setVisible(true);
							node.tree.obj.setItemText(node.obj.id, data.date);
						};

						node.init(true, "");
						return node;
					}

					function dates(binder) {
						var node = new Node();
						var selector = { date: true };
						var datesBinder = new EntityBinder('date', binder, 'runtime.dates');
						var node = new CollectionNode('date', datesBinder, dateNode, selector);

						node.onClick = function () {
							joe.view.load('templates/runtime/dates', datesBinder);
						};

						node.destroy = function () {
							datesBinder.destroy();
						};

						node.init(false, 'Specific Days');
						return node;
					}

					function monthNode(binder) {
						var node = new DataNode(binder, { month: true });

						node.children = [];

						node.onClick = function () {
							joe.view.load('templates/runtime/periods', binder);
						};

						node.receive = function (data) {
							node.setVisible(true);
							node.tree.obj.setItemText(node.obj.id, data.month.join(' '));
						};


						node.loadChildren = function (callback) {
							var weekdays = new WeekdaysNode(binder, 'weekdays');
							weekdays.init(false, 'any Weekday');
							weekdays.addTo(this.tree, this.obj.id);
							this.children.push(weekdays);

							var monthdays = new MonthdaysNode(binder, 'monthday');
							monthdays.init(false, 'Days in a Month');
							monthdays.addTo(this.tree, this.obj.id);
							this.children.push(monthdays);

							var ultimos = new UltimosNode(binder, 'ultimos');
							ultimos.init(false, 'Ultimo');
							ultimos.addTo(this.tree, this.obj.id);
							this.children.push(ultimos);

							var weekday = new WeekdayNode(binder, 'monthday');
							weekday.init(false, 'Specific Days of Week');
							weekday.addTo(this.tree, this.obj.id);
							this.children.push(weekday);

							callback();
						};

						node.destroy = function () {
							DataNode.prototype.destroy.call(this);

							for (var i = 0; i < this.children.length; i++) {
								this.children[i].destroy();
							}
						};

						node.init(true, "");

						return node;
					}

					function month(binder) {
						var target = 'month';
						var selector = {
							month: true,
							monthday: true,
							ultimos: true,
							weekdays: true
						};

						var monthBinder = new EntityBinder(target, binder, 'runtime.monthCollection');
						var month = new CollectionNode(target, monthBinder, monthNode, selector);

						month.onClick = function () {
							joe.view.load('templates/runtime/month', monthBinder);
						};

						month.init(false, 'Specific Months');

						month.destroy = function () {
							CollectionNode.prototype.destroy.call(this);
							monthBinder.destroy();
						};
						return month;
					}

					function holidays(binder) {
						var node = new Node();

						node.onClick = function () {
							joe.view.load('templates/runtime/holidays', binder);
						};

						var weekdaysBinder = new EntityBinder('weekdays', binder, 'runtime.holidays.weekdaysCollection');

						node.loadChildren = function (callback) {
							this.child = new WeekdaysNode(weekdaysBinder);
							this.child.init(false, 'any Weekday');
							this.child.addTo(this.tree, this.obj.id);
							callback();
						};

						node.destroy = function () {
							this.node.destroy();
							weekdaysBinder.destroy();
						};

						node.init(true, 'Non Working Days');
						return node;
					}

					var runtimeSub = [weekdays, monthdays, ultimos, weekday, dates, month, holidays];

					RuntimeNode.prototype.loadChildren = function (callback) {
						for (var i = 0; i < runtimeSub.length; i++) {
							var sub = runtimeSub[i](this.binder, this.tree);
							sub.addTo(this.tree, this.obj.id);
						}
						callback();
					};

					joe.loader.finished(RuntimeNode);
				});
			});
		});
	});
});
