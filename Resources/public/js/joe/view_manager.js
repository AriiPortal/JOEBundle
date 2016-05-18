/*
 * ViewManager:
 *
 * Manage view loading and swaping in JOE
 */
var ViewManager = (function() {
	function ViewManager() {
		this.views = {};
		this.current = null;
	}

	function swap(mgr, view) {
		if (mgr.current != null)
		{
			mgr.current.destroy();
		}

		joe.right.detachObject(true);

		mgr.current = view;
		mgr.current.setup(joe.right);
		mgr.current.init();
	}

	function loadView(name, data) {
		var builder = this.views[name];
		if (builder !== undefined)
		{
			var view = builder(data);

			if(View.prototype.isPrototypeOf(view))
				swap(this, view);
			else
				console.error("Excepted a view");
		}
		else
		{
			console.error("Builder is not defined");
		}
	}

	ViewManager.prototype = {
		load: function(name, data) {
			var ldr = joe.loader;

			if (!this.views.hasOwnProperty(name) && !ldr.isLoaded(name))
			{
				ldr.load(name, function(builder) {
					this.views[name] = builder;
					(loadView.bind(this))(name, data);
				}.bind(this));
			}
			else
			{
				(loadView.bind(this))(name, data);
			}
		}
	}

	return ViewManager;
})();
