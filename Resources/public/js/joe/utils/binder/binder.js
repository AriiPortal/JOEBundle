var Binder = (function() {
	function Binder() {
	}

	var toType = function(obj) {
		return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
	}

	Binder.prototype = {
		/* Take a query selector json as input */
		register: function(obj, callbacks, selector, processDep) {
			var dep = {
				obj: obj,
				callbacks: callbacks,
				selector: selector,
				initialized: false
			};

			var oldSelector = Object.assign({}, this.selector());

			if (processDep)
				processDep(dep);

			this.deps.push(dep);

			if (!this.selector_included(this.depSelector(dep), oldSelector))
			{
				/* Data is missing, let's fetch */
				this.fetch();
			}
			else
			{
				dep.initialized = true;
				if (dep.callbacks && dep.callbacks.onInit)
					dep.callbacks.onInit(this.data);
			}
		},
		depSelector: function(dep) {
			return dep.selector;
		},
		unregister: function(obj) {
			for (var i = 0; i < this.deps.length; i++)
			{
				if (obj == this.deps[i].obj)
				{
					this.deps.splice(i, 1);
					return;
				}
			}
		},
		selector: function() {
			var selector = {};
			this.deps.map(function(x) {
				this.selector_merge(this.depSelector(x), selector);
			}.bind(this));
			return selector;
		},
		selector_merge: function (src, dest) {
			for (var key in src)
			{
				if (dest.hasOwnProperty(key))
				{
					if (dest[key] === true)
						continue;

					if (toType(dest[key]) == "object")
					{
						if (toType(src[key] == "object"))
							this.selector_merge(src[key], dest[key]);
						else if (src[key] == true)
							dest[key] = true;
					}
				}
				else
				{
					dest[key] = src[key];
				}
			}
		},
		/* Determines whether src's keys are included in dst's keys */
		selector_included: function (src, dst) {
			for (var key in src)
			{
				if (dst.hasOwnProperty(key))
				{
					if (toType(src[key]) === toType(dst[key]))
					{
						if (toType(src[key]) === "object")
						{
							var rec = this.selector_included(src[key], dst[key]);
							if (!rec)
							{
								return false;
							}
						}
					}
				}
				else
				{
					return false;
				}
			}
			return true;
		},
		destroy: function() {

		},
		fetch: undefined, /* Should be implemented child objects */

	}

	return Binder;
})();

joe.loader.finished(Binder);
