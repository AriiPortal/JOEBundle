function bindFormData(form, data, fields)
{
	function getValue(data, namespace)
	{
		if (data == null)
		{
			return null;
		}

		if (namespace.length == 1)
		{
			return data.hasOwnProperty(namespace[0])
				 ? data[namespace[0]]
				 : null;
		}
		else
		{
			return getValue(data[namespace[0]], namespace.slice(1));
		}
	}

	function setValue(form, field, value)
	{
		if (value == null)
		{
			if (!field.hasOwnProperty('default'))
			{
				return;
			}
			value = field.default;
		}

		if (!field.hasOwnProperty('type')) {
			// Consider field as input if no type is given
			field.type = 'input';
		}

		switch (field.type) {
			case 'input':
				form.setItemValue(field.name, value);
				break
			case 'checkbox':
				value ? form.checkItem(field.name):form.uncheckItem(field.name);
				break;
			case 'radio':
				form.checkItem(field.name, value);
				break;
			case 'combo':
				form.getCombo(field.name).setComboText(value);
				form.getCombo(field.name).setComboValue(value);
				break;
		}
	}

	function bindField(form, data, field)
	{
		var namespace = field.name.split('.');
		var fieldType = field.type;
		var value = getValue(data, namespace);

		if (field.hasOwnProperty('toForm'))
		{
			value = field.toForm(value);
		}

		setValue(form, field, value);
	}

	for (var i = 0 ; i < fields.length ; ++i)
	{
		var field = fields[i];
		bindField(form, data, field);
	}
}

function formChangeCallback(target, form, fields)
{
	function buildDiff(field, val)
	{
		var path = field.split(".");
		var diff = {}

		var cur = diff;
		var i = 0;

		for (i = 0; i < (path.length - 1); i++)
		{
			cur[path[i]] = {};
			cur = cur[path[i]];
		}

		cur[path[i]] = val;
		return diff;
	}

	function onChange(id, value, checked)
	{
		console.log(value);
		for (var i = 0; i < fields.length; i++)
		{
			if (id == fields[i].name)
			{
				var val = value != null ? value : checked;

				if (fields[i].hasOwnProperty('toAPI'))
				{
					val = fields[i].toAPI(val);
				}

				var diff = buildDiff(id, val);

				var xhr = new XMLHttpRequest();
				xhr.open("POST", target, true);
				xhr.setRequestHeader('Content-Type',
									 'application/json; charset=UTF-8');
				xhr.send(JSON.stringify(diff));

				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4 && xhr.status != 200)  // The operation is complete
					{
						console.error(xhr.responseText);
					}
				}
			}
		}
	}

	return onChange;
}
