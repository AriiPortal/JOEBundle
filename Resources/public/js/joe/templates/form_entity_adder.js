joe.loader.load('utils/entity_grid', function (EntityGrid) {
	var FormEntityAdder = (function () {
		function FormEntityAdder(target, rowDesc, dataToForm, formToData, formDesc, ctrlsDesc, binder, refresh)
		{
			this.target = target;
			this.rowDesc = rowDesc;
			this.dataToForm = dataToForm;
			this.formToData = formToData;
			this.formDesc = formDesc;
			this.ctrlsDesc = ctrlsDesc;
			this.binder = binder;
			this.refresh = refresh;
			this.forms = {};
			this.grid = null;
			this.current = null;
		}

		FormEntityAdder.prototype = new View();

		FormEntityAdder.prototype.setup = function (parent) {
			var layout = parent.attachLayout('2U');
			var subLayout = layout.cells('a').attachLayout('2E');
			var formCell = subLayout.cells('a');
			var gridCell = subLayout.cells('b');
			var ctrlsCell = layout.cells('b');

			formCell.fixSize(false, true);
			ctrlsCell.setWidth(150);
			ctrlsCell.fixSize(true, false);

			formCell.hideHeader();
			ctrlsCell.hideHeader();
			gridCell.hideHeader();

			function genCtrlForm(parent)
			{
				var callbacks = {};

				var formDesc = this.ctrlsDesc.map(function (ctrl, i) {
					var id = String(i);
					callbacks[id] = ctrl.action;
					return {
						type: 'button',
						name: id,
						value: ctrl.label,
						width: 140
					};
				});
				var form = parent.attachForm(formDesc);
				form.attachEvent('onButtonClick', function (id) {
					(callbacks[id])(this);
				}.bind(this));
			}

			this.forms.user = formCell.attachForm(this.formDesc);
			this.forms.user.attachEvent('onChange', function (name, value, state) {
				if (this.refresh)
				{
					this.refresh(this.forms.user, name, value, state);
				}
			}.bind(this));

			this.forms.ctrls = (genCtrlForm.bind(this))(ctrlsCell);

			var grid = gridCell.attachGrid();
			this.grid = new EntityGrid(this.target
									 , grid
									 , this.rowDesc
									 , this.binder
			);

			this.grid.onClick = function (obj) {
				this.current = obj.data.id;
				this.enableForm();
				this.dataToForm(this.forms.user, obj.data);
			}.bind(this);

			this.disableForm();

		};

		FormEntityAdder.prototype.create = function () {
			this.grid.create(this.formToData(this.forms.user), function () {
				this.disableForm();
			}.bind(this));
		}

		FormEntityAdder.prototype.init = function () {
		}

		FormEntityAdder.prototype.destroy = function () {
			this.grid.destroy();
		}

		FormEntityAdder.prototype.update = function () {
			if (this.current)
			{
				this.grid.update(this.current
								 , this.formToData(this.forms.user)
								 , function () {
									 this.disableForm();
								 }.bind(this));
			}
		}

		FormEntityAdder.prototype.remove = function () {
			if (this.current)
			{
				this.grid.remove(this.current, function () {
					this.disableForm();
				}.bind(this));
				this.current = null;
			}
		}

		function toggleForm(enable)
		{
			this.formDesc.map(
				item =>
					enable
					? this.forms.user.enableItem(item.name)
					: this.forms.user.disableItem(item.name)
			);
		}

		FormEntityAdder.prototype.enableForm = function () {
			this.dataToForm(this.forms.user, null);
			(toggleForm.bind(this))(true);
			if (this.refresh)
			{
				this.refresh(this.forms.user);
			}
		}

		FormEntityAdder.prototype.disableForm = function () {
			this.dataToForm(this.forms.user, null);
			(toggleForm.bind(this))(false);
		}

		return FormEntityAdder;
	})();

	joe.loader.finished(FormEntityAdder);
});
