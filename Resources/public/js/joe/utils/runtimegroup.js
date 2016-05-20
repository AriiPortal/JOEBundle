(function() {
	/**
	 * build a form that helps manipulate groups
	 *
	 * @param parent
	 * @param description - format:
	 * {
	 * 	'selects': {
	 * 		'options': {
	 * 			'label':
	 * 			, 'options':
	 * 		}
	 * 		, 'groups':
	 * 	}
	 * 	, 'buttons': {
	 * 		'addOption':
	 * 		, 'removeGroup':
	 * 		, 'addEveryToGroup':
	 * 		, 'addToGroup':
	 * 		, 'removeFromGroup':
	 * 		, 'newGroup':
	 * 		, 'applyGroup':
	 * 	}
	 * 	, 'functions': {
	 * 		'formatGroup':
	 * 		, 'newGroup':
	 * 		, 'addToGroup':
	 * 		, 'removeGroup':
	 * 		, 'removeFromGroup':
	 * 		, 'groupOptions':
	 * 		, 'valuesToOptions':
	 * 	}
	 * }
	 */
	function buildGroupForm(parent, description)
	{
		var formJson = [
			{ type: 'block', name: 'block1', list: [
				{
					type: "select"
					, name: "options1"
					, label: description.selects.options.label
					, options: description.selects.options.options
					, inputWidth: 140
				},
				{ type: "newcolumn" },
				{ type: "button", name: "addOption", value: description.buttons.addOption.label, width: 110 }
			]},
			{ type: 'block', name: 'block2', list: [
				{
					type: "multiselect"
					, name: "groups"
					, options: description.selects.groups
					, inputWidth: 400
					, inputHeight: 250
				},
				{ type: "newcolumn" },
				{ type: "button", name: "removeGroup", value: description.buttons.removeGroup.label, width: 110 }
			]},
			{ type: 'block', name: 'block3', list: [
				{
					type: "multiselect"
					, name: "options2"
					, inputWidth: 250
					, inputHeight: 250
				},
				{ type: "newcolumn" },
				{ type: "block", name: "block31", list: [
					{ type: "button", name: "addEveryToGroup", hidden: true, width: 110 },
					{ type: "button", name: "addToGroup", value: description.buttons.addToGroup.label, width: 110 },
					{ type: "button", name: "removeFromGroup", value: description.buttons.removeFromGroup.label, width: 110 }
				]},
				{ type: "newcolumn" },
				{ type: "multiselect", name:"group", inputWidth: 250, inputHeight: 250 },
				{ type: "newcolumn" },
				{ type: "block", name: "block32", list: [
					{ type: "button", name: "newGroup", value: description.buttons.newGroup.label, width: 110 },
					{ type: "button", name: "applyGroup", value: description.buttons.applyGroup.label, width: 110 }
				]}
			]}
		];

		var form = parent.attachForm(formJson);
		var groupEdit = false
		var currentGroup;
		var toAdd = [];
		var toRemove = [];

		if (description.buttons.hasOwnProperty('addEveryToGroup'))
		{
			form.setItemLabel('addEveryToGroup', description.buttons.addEveryToGroup.label)
			form.showItem('addEveryToGroup');
		}

		function getSelectedGroup()
		{
			var list = form.getItemValue('groups');
			return list.length > 0
				? list[0]
				: null;
		}

		function availableOptions(id)
		{
			var options;

			if (id)
			{
				/**
				 * id references an existing group
				 * select all options not registered
				 */
				options = description.functions.groupOptions(id);
				options = description.selects.options.options.filter(function (avail) {
					return !options.some(function (option) {
						return option.value == avail.value;
					});
				});
			}
			else
			{
				options = description.selects.options.options;
			}

			/**
			 * minus added options
			 */
			options = options.filter(function (avail) {
				return !toAdd.some(function (added) {
					return added == avail.value;
				});
			});

			/**
			 * plus registered options which are pending to be removed
			 */
			options = options.concat(description.functions.valuesToOptions(toRemove));

			return options.sort();
		}

		function currentOptions(id)
		{
			var options = [];

			if (id)
			{
				/**
				 * id references an existing group
				 */
				options = description.functions.groupOptions(id);

				/**
				 * minus removed options
				 */
				options = options.filter(function (current) {
					return !toRemove.some(function (removed) {
						return removed == current.value;
					});
				});
			}

			/**
			 * plus added options
			 */
			options = options.concat(description.functions.valuesToOptions(toAdd));

			return options.sort();
		}

		function refreshForm()
		{
			form.getOptions('groups').length == 0
				? form.disableItem('removeGroup')
				: form.enableItem('removeGroup');

			var options;
			var availables;
			if (groupEdit)
			{
				availables = availableOptions(currentGroup);
				options = currentOptions(currentGroup);
				form.enableItem('applyGroup');
				form.enableItem('addToGroup');
				form.enableItem('removeFromGroup');
			}
			else
			{
				availables = [];
				options = [];
				form.disableItem('applyGroup');
				form.disableItem('addToGroup');
				form.disableItem('removeFromGroup');
			}
			form.reloadOptions('options2', availables);
			form.reloadOptions('group', options);
		}

		form.attachEvent('onChange', function (id) {
			if (id == 'groups')
			{
				currentGroup = getSelectedGroup();
				toAdd = [];
				toRemove = [];
				groupEdit = true;
				refreshForm()
			}
		});

		function addGroupOption(id)
		{
			var DHTMLXOption = new Option("", id);
			form.getOptions('groups').add(DHTMLXOption);
		}

		function updateGroupOption(id)
		{
			var i;
			for (i = 0 ; i < form.getOptions('groups').length ; ++i)
			{
				if (form.getOptions('groups')[i].value == id)
				{
					break;
				}
			}
			form.getOptions('groups')[i].text = description.functions.formatGroup(id);
		}

		function removeGroup(id)
		{
			var i;
			for (i = 0 ; i < form.getOptions('groups').length ; ++i)
			{
				if (form.getOptions('groups')[i].value == id)
				{
					break;
				}
			}
			form.getOptions('groups').remove(i);
		}

		function removeOption(value)
		{
			var index = toAdd.findIndex(function (elem) {
				return elem == value;
			});
			if (index == -1)
			{
				toRemove.push(value);
			}
			else
			{
				toAdd = toAdd.filter(function (elem) {
					return value != elem;
				});
			}
		}

		form.attachEvent('onButtonClick', function (id) {
			if (id == 'addOption')
			{
				var options = [form.getItemValue('options1')];
				description.functions.newGroup(options, function (id) {
					addGroupOption(id);
					updateGroupOption(id);
				});
			}
			else if (id == 'removeGroup')
			{
				var group = getSelectedGroup();
				description.functions.removeGroup(group, function () {
					removeGroup(group);
					groupEdit = false;
				});
			}
			else if (id == 'addToGroup')
			{
				var values = form.getItemValue('options2');;
				toAdd = toAdd.concat(values);
			}
			else if (id == 'addEveryToGroup')
			{
			}
			else if (id == 'removeFromGroup')
			{
				var values = form.getItemValue('group');
				for (var i = 0 ; i < values.length ; ++i)
				{
					removeOption(values[i]);
				}
			}
			else if (id == 'newGroup')
			{
				currentGroup = null;
				toAdd = [];
				toRemove = [];
				groupEdit = true;
			}
			else if (id == 'applyGroup')
			{
				if (currentGroup == null)
				{
					if (toAdd.length > 0)
					{
						description.functions.newGroup(toAdd, function (id) {
							addGroupOption(id);
							updateGroupOption(id);
						});
					}
				}
				else
				{
					description.functions.addToGroup(currentGroup, toAdd, function (num) {
						description.functions.removeFromGroup(currentGroup, toRemove, function (num) {
							if (num > 0)
							{
								updateGroupOption(currentGroup);
							}
							else
							{
								description.functions.removeGroup(currentGroup, function () {
									removeGroup(currentGroup);
								});
							}
						});
					});
				}
				groupEdit = false;
			}

			refreshForm();
		});

		refreshForm();
	}

	joe.loader.finished(buildGroupForm);
})();
