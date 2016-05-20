joe.loader.load('utils/runtimegroup', function(buildGroupForm) {
joe.loader.load('utils/binder/entity_binder', function(EntityBinder) {

	function mkOption(label, value)
	{
		return {'label': label, 'value': value};
	}

	/**
	 * return a DHTMLX option representing a Day
	 *
	 * @param {Integer} day
	 */
	function dayToOption(day)
	{
		return mkOption(toDayName(day), day);
	}

	/**
	 * return a DHTMLX option list representing a [Day]
	 *
	 * @param {[Integer]} days
	 */
	function daysToOptions(days)
	{
		return days.map(function (day) {
			return dayToOption(day);
		});
	}

	/**
	 * return a list of DHTMLX options representing the content of a Day
	 *
	 * @param {UUID} id - must exist
	 */
	function daysOptions(id)
	{
		var days = this.data[id].data;
		return daysToOptions(days.day);
	}

	/**
	 * initialization of the form options representing the possible values
	 * for Arii\JOEBundle\Entity\Day
	 */
	var options = spec.weekdays.map(function (day, index) {
		return mkOption(day, indexToDay(index));
	});


	/**
	 * create a new Day
	 * call callback on success
	 * with params: - uuid of the new Day
	 *
	 * @param {[Integer]} days - not empty
	 * @param callback
	 */
	function newDays(days, callback)
	{
		this.binder.create({ day: days}, function(data) {
			callback(data.id);
		});
	}

	/**
	 * remove a Day
	 * call callback on success
	 * with no params
	 *
	 * @param {UUID} id - Day id, must exist
	 * @param callback
	 */
	function removeDays(id, callback)
	{
		this.binder.remove(id, function(data) {
			callback();
		});
	}

	/**
	 * set days to a Day
	 * call callback on success
	 * with params: number of days in Day
	 *
	 * @param {UUID} id - Day id, must exist
	 * @param [Integer] days
	 * @param callback
	 */
	function setDays(id, days, callback)
	{
		this.data[id].binder.update({day : days}, function(data) {
			callback(data.day.length);
		});
	}

	/**
	 * add some days to a Day
	 * call callback on success
	 * with params: number of days in Day
	 *
	 * @param {UUID} id - Day id, must exist
	 * @param [Integer] days
	 * @param callback
	 */
	function addToDays(id, days, callback)
	{
		var days = this.data[id].data.day.concat(days);
		(setDays.bind(this))(id, days, callback);
	}

	/**
	 * remove a set of days from a Day
	 * call callback on success
	 * with params: number of day left in Day
	 * if no days are left in Day, the entity should be removed
	 *
	 * @param {UUID} id - Day id, must exist
	 * @param [Integer] days
	 * @param callback
	 */
	function removeFromDays(id, days, callback)
	{
		var newDays = this.data[id].data.day;
		newDays = newDays.filter(function (current) {
			return days.indexOf(current) < 0;
		});
		(setDays.bind(this))(id, newDays, callback);
	}


	function initGroup(data) {
		this.data = data;
		var currentDays = []

		function formatDays(id)
		{
			return data[id].data.day.map(function (day) {
				return toDayName(day);
			}).join(" ");
		}

		for (var key in data)
			currentDays.push(mkOption(formatDays(key), key));

		var description = {
			'selects': {
				'options': {
					'label': 'Weekdays'
					, 'options': options
				}
				, 'groups': currentDays
			}
			, 'buttons': {
				'addOption': {'label': 'Add Weekday' }
				, 'removeGroup': {'label': 'Remove' }
				, 'addEveryToGroup': {'label': 'Every Day'}
				, 'addToGroup': {'label': 'Add'}
				, 'removeFromGroup': {'label': 'Remove'}
				, 'newGroup': {'label': 'New Group'}
				, 'applyGroup': {'label': 'Apply Group'}
			}
			, 'functions': {
				'formatGroup': formatDays
				, 'newGroup': newDays.bind(this)
				, 'addToGroup': addToDays.bind(this)
				, 'removeGroup': removeDays.bind(this)
				, 'removeFromGroup': removeFromDays.bind(this)
				, 'groupOptions': daysOptions.bind(this)
				, 'valuesToOptions': daysToOptions.bind(this)
			}
		};

		buildGroupForm(this.parent, description);
	}

	function build(binder) {
		var view = new View;

		view.setup = function (parent) {

			this.binder = binder;
			this.parent = parent;

			var callbacks = {
				onInit: initGroup.bind(this)
			};

			this.binder.register(this, callbacks, { day: true });
		}

		view.destroy = function() {
		}

		return view;
	}
	joe.loader.finished(build);
})
});
