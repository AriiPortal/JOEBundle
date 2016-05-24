'use strict';

joe.loader.load('utils/binder/list_binder', function (ListBinder) {
	var EntityBinder = function () {

		/* Transform a given selector by a given root */
		function rootSelector(root) {
			var final_selector = {};
			var path = root.split('.');
			var ptr = final_selector;
			var j;

			for (j = 0; j < path.length - 1; j++) {
				ptr[path[j]] = {};
				ptr = ptr[path[j]];
			}

			ptr[path[j]] = true;
			return final_selector;
		}

		function unwrap(root, data) {
			var path = root.split('.');
			var ptr = data;
			var i;
			for (i = 0; i < path.length - 1; i++) {
				ptr = ptr[path[i]];
			}return ptr[path[i]];
		}

		function EntityBinder(target, parent, root) {
			ListBinder.call(this, target);
			this.parent = parent;
			this.root = root;
			this.deps = [];
			this.data = {};

			var selector = rootSelector(this.root);

			var onFetch = function (data) {
				if (this.waiting) {
					var res = unwrap(root, data);
					this._onFetch(res);
				}
			}.bind(this);

			var callbacks = {
				onInit: onFetch,
				onUpdate: onFetch
			};

			this.parent.register(this, callbacks, selector);
		}

		EntityBinder.prototype = new ListBinder();

		function addCommand(root, id) {
			var diff = {};

			var path = root.split('.');
			var ptr = diff;
			var j;

			for (j = 0; j < path.length - 1; j++) {
				ptr[path[j]] = {};
				ptr = ptr[path[j]];
			}

			ptr[path[j] + ":+"] = id;
			return diff;
		}

		EntityBinder.prototype._onCreate = function (data) {
			var diff = addCommand(this.root, data.id);
			this.parent.update(diff);
		};

		EntityBinder.prototype.fetch = function () {
			this.waiting = true;
			this.parent.fetch();
		};

		EntityBinder.prototype.destroy = function () {
			this.parent.unregister(this);
		};

		return EntityBinder;
	}();

	joe.loader.finished(EntityBinder);
});