joe.loader.load('utils/entity_grid', function(EntityGrid) {
	/*
	 * DefaultEntityAdder:
	 * UI Facility to create new entity and display them on a grid
	 */
	var DefaultEntityAdder = (function() {
		function DefaultEntityAdder(target, rowDesc, controlDesc, binder) {
			this.target = target;
			this.rowDesc = rowDesc;
			this.controlDesc = controlDesc;
			this.binder = binder;
			this.selected = null;
			this.grid = null;
		}

		DefaultEntityAdder.prototype = new View;

		function genForm(parent) {
			var formDesc = [
				{ type:"settings" , labelWidth:80, inputWidth:250, position:"absolute" }
			];

			var callbacks = {}

			for (var i = 0; i < this.controlDesc.length; i++)
			{
				var cur = this.controlDesc[i];

				formDesc.push(
					{ type:"button", name: String(i),
					  label: cur.label, value: cur.label,
					  inputLeft:5, inputTop: ((i * 50) + 5)
					}
				);

				callbacks[String(i)] = cur.action;
			}

			var form = parent.attachForm(formDesc)

			form.attachEvent('onButtonClick', function (id) {
				if (callbacks.hasOwnProperty(id))
				{
					(callbacks[id])(this);
				}
			}.bind(this));

			return form;
		}

		DefaultEntityAdder.prototype.setup = function(parent) {
			var layout = parent.attachLayout('2U');
			var left = layout.cells('a');

			left.hideHeader();

			var obj = left.attachGrid();
			obj.setImagePath( "/bundles/ariicore/images/treegrid/");

			this.grid = new EntityGrid(this.target, obj, this.rowDesc, this.binder);
			this.grid.onClick = function (data) {
				this.selected = data.data.id;
			}.bind(this);

			var right = layout.cells('b');
			right.hideHeader();
			right.setWidth('280');
			right.fixSize(1,0);

			this.control = (genForm.bind(this))(right);
		}

		DefaultEntityAdder.prototype.init = function() {
		}

		DefaultEntityAdder.prototype.destroy = function() {
			this.grid.destroy();
		}

		return DefaultEntityAdder;
	})();

	joe.loader.finished(DefaultEntityAdder);
});
