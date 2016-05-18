joe.loader.load('utils/binder/list_binder', function(ListBinder) {
	var StandaloneBinder = (function() {
		function StandaloneBinder(target) {
			ListBinder.call(this, target);
			this.deps = [];
			this.data = {};
			this.url = joe.routes.api(target).list;
		}

		StandaloneBinder.prototype = new ListBinder;

		StandaloneBinder.prototype.fetch = function() {
			var xhr = new XMLHttpRequest();
			xhr.open('POST', this.url, true);
			xhr.responseType = 'json';

			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4)
				{
					if (xhr.status == 200)
					{
						this._onFetch(xhr.response);
					}
					else
					{
						console.error("Could not delete entity: "
									  + xhr.responseText);
					}
				}
			}.bind(this);

			xhr.send(JSON.stringify(this.selector()));
		}

		return StandaloneBinder;
	})();

	joe.loader.finished(StandaloneBinder);
});
