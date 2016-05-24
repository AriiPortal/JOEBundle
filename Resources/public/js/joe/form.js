'use strict';

/*
 * Form
 */
var Form = function () {

	function descToSelector(desc) {
		var selector = {};

		selector.id = true;

		for (var i = 0; i < desc.length; i++) {
			var path = desc[i].name.split('.');
			var ptr = selector;
			var j;
			for (j = 0; j < path.length - 1; j++) {
				ptr[path[j]] = {};
				ptr = ptr[path[j]];
			}

			ptr[path[j]] = true;
		}
		return selector;
	}

	/* Build the differential update */
	function buildDiff(field, val) {
		var path = field.split(".");
		var diff = {};

		var cur = diff;
		var i = 0;

		for (i = 0; i < path.length - 1; i++) {
			cur[path[i]] = {};
			cur = cur[path[i]];
		}

		cur[path[i]] = val;
		return diff;
	}

	function onChange(id, value, checked) {
		for (var i = 0; i < this.desc.length; i++) {
			if (id == this.desc[i].name) {
				var val = value != null ? value : checked;

				if (this.desc[i].hasOwnProperty('toAPI')) {
					val = this.desc[i].toAPI(val);
				}

				var diff = buildDiff(id, val);

				this.binder.update(diff);
				this.onChange(id, value, checked);
				return true;
			}
		}
	}

	/* Called uppon receiving data from the binder */
	function receiveData(form, desc, data) {
		bindFormData(form, data, desc);
	}

	function Form(obj, desc, binder) {
		this.obj = obj;
		this.binder = binder;
		this.desc = desc.slice();

		var selector = descToSelector(desc);

		var receive = receiveData.bind(this, obj, this.desc);
		var callbacks = {
			onInit: receive,
			onUpdate: receive
		};

		binder.register(this, callbacks, selector);
		this.obj.attachEvent('onChange', onChange.bind(this));
	}

	function getValue(data, namespace) {
		if (data == null) {
			return null;
		}

		if (namespace.length == 1) {
			return data.hasOwnProperty(namespace[0]) ? data[namespace[0]] : null;
		} else {
			return getValue(data[namespace[0]], namespace.slice(1));
		}
	}

	function setValue(form, field, value) {
		if (value == null) {
			if (!field.hasOwnProperty('default')) {
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
				break;
			case 'checkbox':
				value ? form.checkItem(field.name) : form.uncheckItem(field.name);
				break;
			case 'radio':
				form.checkItem(field.name, value);
				break;
		}
	}

	function bindField(form, data, field) {
		var namespace = field.name.split('.');
		var fieldType = field.type;
		var value = getValue(data, namespace);

		if (field.hasOwnProperty('toForm')) {
			value = field.toForm(value);
		}

		setValue(form, field, value);
	}

	function bindFormData(form, data, fields) {

		for (var i = 0; i < fields.length; ++i) {
			var field = fields[i];
			bindField(form, data, field);
		}
	}

	Form.prototype = {
		destroy: function destroy() {
			this.binder.unregister(this);
		},
		setFieldValue: function setFieldValue(name, value) {
			for (var i = 0; i < this.desc.length; i++) {
				if (name == this.desc[i].name) {
					setValue(this.obj, this.desc[i], value);

					if (this.desc[i].hasOwnProperty('type') && (this.desc[i].type === 'checkbox' || this.desc[i].type === 'radio')) {
						onChange.bind(this)(name, null, value);
					} else {
						onChange.bind(this)(name, value, null);
					}
					return;
				}
			}
		},
		onChange: function onChange(id, value, checked) {}
	};

	return Form;
}();