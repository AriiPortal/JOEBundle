'use strict';

joe.loader.load('utils/binder/binder', function (Binder) {
	joe.loader.load('utils/binder/data_binder', function (DataBinder) {
		var ListBinder = function () {

			function ListBinder(target) {
				this.target = target;
				this.route = joe.routes.api(target);
			}

			var toType = function toType(obj) {
				return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
			};

			ListBinder.prototype = new Binder();

			ListBinder.prototype.register = function (obj, callbacks, selector, childSelector) {
				var setChildSelector = function setChildSelector(dep) {
					dep.childSelector = childSelector ? childSelector : {};
				};
				Binder.prototype.register.call(this, obj, callbacks, selector, setChildSelector);
			};

			ListBinder.prototype._onCreate = function (data) {};

			ListBinder.prototype.depSelector = function (dep) {
				var selector = {};
				this.selector_merge(dep.selector, selector);
				this.selector_merge(dep.childSelector, selector);
				return selector;
			};

			ListBinder.prototype._onRemove = function (data) {};

			ListBinder.prototype._childrenSelector = function () {
				var selector = {};
				this.deps.map(function (x) {
					this.selector_merge(x.childSelector, selector);
				}.bind(this));
				return selector;
			};

			ListBinder.prototype.selector = function () {
				var selector = Binder.prototype.selector.call(this);
				this.selector_merge(this._childrenSelector(), selector);
				selector.id = true;
				return selector;
			};

			function updateHook(id, data) {
				this._update(id, data);
				this.deps.map(function (x) {
					if (x.callbacks) {
						var callback = x.callbacks.onUpdate;
						if (callback) callback(id, this.data[id]);
					}
				}.bind(this));
			}

			ListBinder.prototype._update = function (id, data) {
				this.data[id].data = data;
			};

			ListBinder.prototype._add = function (data) {

				var binder = new DataBinder(this.target, data.id, this._childrenSelector(), updateHook.bind(this, data.id));
				binder.feed(data);

				var el = {
					data: data,
					binder: binder
				};

				this.data[data.id] = el;
				return el;
			};

			ListBinder.prototype._onFetch = function (list) {
				var next = {};

				for (var i = 0; i < list.length; i++) {
					next[list[i].id] = list[i];
				}var current = Object.assign({}, this.data);

				/* We start by NEW and UPDATED data */
				for (var key in next) {
					if (current.hasOwnProperty(key)) {
						var data = next[key];
						this._update(data.id, data);
						this.deps.map(function (x) {
							if (x.callbacks && x.initialized) {
								var callback = x.callbacks.onUpdate;
								if (callback) callback(data.id, this.data[data.id]);
							}
						}.bind(this));

						delete current[key];
					} else {
						/* We should add a new one */
						var wrapper = this._add(next[key]);
						this.deps.map(function (x) {
							if (x.callbacks && x.initialized) {
								var callback = x.callbacks.onCreate;
								if (callback) callback(wrapper);
							}
						}.bind(this));
						delete current[key];
					}
					delete next[key];
				}

				/* The remaining entities have been deleted */
				for (var key in current) {
					this.deps.map(function (x) {
						if (x.callbacks && x.initialized) {
							var callback = x.callbacks.onRemove;
							if (callback) callback(this.data[key]);
						}
					}.bind(this));
					delete this.data[key];
				}

				this.deps.map(function (x) {
					if (x.callbacks) {
						var callback;

						if (!x.initialized) {
							x.initialized = true;
							callback = x.callbacks.onInit;
						}

						if (callback) callback(this.data);
					}
				}.bind(this));
			};

			ListBinder.prototype.getData = function (id) {
				if (this.data.hasOwnProperty(id)) {
					return this.data[id];
				} else {
					console.error("ListBinder: No such entity");
					return null;
				}
			};

			ListBinder.prototype._propagate = function (event, data) {
				this.deps.map(function (x) {
					if (x.callbacks) {
						var callback = x.callbacks[event];
						if (callback) callback(data);
					}
				}.bind(this));
			};

			ListBinder.prototype.create = function (data, callback) {
				var url = this.route.create;

				var xhr = new XMLHttpRequest();
				xhr.open("POST", url, true);
				xhr.responseType = 'json';

				xhr.onreadystatechange = function () {
					if (xhr.readyState == 4) {
						if (xhr.status == 200) {
							var data = xhr.response;
							var wrapped = this._add(data);
							this._onCreate(data);
							this._propagate('onCreate', wrapped);
							if (callback) {
								callback(data);
							}
						} else {
							console.error("Could not add entity: " + xhr.responseText);
						}
					}
				}.bind(this);
				xhr.send(JSON.stringify(data));
			};

			ListBinder.prototype.remove = function (id, callback) {
				if (this.data.hasOwnProperty(id)) {
					var url = this.route.select(id).remove;
					var xhr = new XMLHttpRequest();
					xhr.open("GET", url, true);

					xhr.onreadystatechange = function () {
						if (xhr.readyState == 4) {
							if (xhr.status == 200) {
								var data = this.data[id];
								this._onRemove(data);
								this._propagate('onRemove', data);
								delete this.data[id];
								if (callback) {
									callback(id);
								}
							} else {
								console.error("Could not remove entity: " + xhr.responseText);
							}
						}
					}.bind(this);
					xhr.send();
				}
			};

			return ListBinder;
		}();

		joe.loader.finished(ListBinder);
	});
});