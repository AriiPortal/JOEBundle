joe.loader.load('utils/binder/binder', function(Binder) {
	var DataBinder = (function() {
		function DataBinder(target, id, preselector) {
			this.target = target;
			this.id = id;
			this.deps = [];
			this.data = {};
			this.route = joe.routes.api(target).select(id);
			this.preselector = preselector ? preselector : {};
		}

		var toType = function(obj) {
			return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
		}

		/* Select only the needed data using current selector */
		function selectData(selector, data) {
			var selected = {};

			for (var key in selector)
			{
				if (data.hasOwnProperty(key))
				{
					if (selector[key] === true)
					{
						selected[key] = data[key];
					}
					else if (toType(selector[key]) === 'object')
					{
						selected[key] = selectData(selector[key], data[key])
					}
				}
			}
			return selected;
		}

		var toType = function(obj) {
			return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
		}

		function data_merge(src, dest) {
			var diff = {};

			for (var key in src)
			{
				if (dest.hasOwnProperty(key))
				{
					if (toType(src[key]) !== toType(dest[key]))
					{
						console.error("Type error");
						continue;
					}

					if (toType(src[key]) == "object")
					{
						var subdiff = data_merge(src[key], dest[key]);
						if (Object.keys(subdiff).length > 0)
						{
							diff[key] = subdiff;
						}
					}
					else
					{
						if (src[key] !== dest[key])
						{
							dest[key] = src[key];
							diff[key] = src[key];
						}
					}
				}
				else
				{
					/* Check if memleaks are feasible */
					dest[key] = src[key];
					diff[key] = src[key];
				}
			}
			return diff;
		}

		/* Test whether a json (src) keys are included in
		   another (dest), deeply */
		function isDiffSelected(diff, selector) {
			for (var key in diff)
			{
				/* As long as we have at least one key of the diff matching
				   we return true */
				if (selector.hasOwnProperty(key))
				{
					if (selector[key] === true)
					{
						return true;
					}
					else if (toType(selector[key]) === "object")
					{
						if(isDiffSelected(diff[key], selector[key]))
						{
							return true;
						}
					}
				}
			}
		}

		DataBinder.prototype = new Binder;

		DataBinder.prototype.selector = function() {
			var selector = Binder.prototype.selector.call(this);
			this.selector_merge(this.preselector, selector);
			return selector;
		}

		DataBinder.prototype.fetch = function() {
			var xhr = new XMLHttpRequest();

			xhr.open("POST", this.route.json, true);
			xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
			xhr.responseType = 'json';

			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4)
				{
					if (xhr.status == 200)
					{
						this._mergeRefresh(xhr.response);
					}
					else
					{
						console.error("Cannot fetch data: " + xhr.responseText);
					}
				}
			}.bind(this);
			xhr.send(JSON.stringify(this.selector()));
		}

		DataBinder.prototype.feed = function (data) {
			var selected_data = selectData(this.selector(), data);
			this._mergeRefresh(selected_data, this.data);
		}

		DataBinder.prototype._mergeRefresh = function (data) {
			var diff = data_merge(data, this.data);
			this._refresh(diff);
		}

		DataBinder.prototype.update = function (diff, callback) {
			var xhr = new XMLHttpRequest();
			xhr.open("POST", this.route.update, true);
			xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
			xhr.send(JSON.stringify(diff));

			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status < 400)  // The operation is complete
				{
					this._mergeRefresh(diff);
					if (callback)
					{
						callback();
					}
				}
			}.bind(this);
		}

		DataBinder.prototype._refresh = function (diff) {
			this.deps.map(x => {
				if (isDiffSelected(diff, x.selector) && x.callbacks)
				{
					var callback;

					if (!x.initialized)
					{
						x.initialized = true;
						callback = x.callbacks.onInit;
					}
					else
						callback = x.callbacks.onUpdate;

					if (callback)
						callback(diff);
				}
			});
		}

		return DataBinder;
	})();

	joe.loader.finished(DataBinder);
});
