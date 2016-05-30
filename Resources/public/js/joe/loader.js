'use strict';

/*
 * Loader:
 *
 * Dynamic javascript source loader
 */
var Loader = function () {
	function Loader() {
		this.loaded = {};
		this.loading = [];
	}

	Loader.prototype = {
		load: function load(target, callback) {
			if (this.loaded.hasOwnProperty(target)) {
				callback(this.loaded[target]);
				return;
			}

			var url = joe.routes.asset('js/joe/' + target + '.js');

			this.loading.push({ name: target, callback: callback });

			var newtag = document.createElement('script');
			newtag.setAttribute("type","text/javascript");
			newtag.setAttribute("src", url);
			document.getElementsByTagName("head")[0].appendChild(newtag);
		},
		isLoaded: function isLoaded(target) {
			return this.loaded.hasOwnProperty(target);
		},
		finished: function finished(data) {
			if (this.loading.length > 0) {
				var info = this.loading.pop();
				console.info("[JOE/Loader] Dynamically loaded " + info.name);
				this.loaded[info.name] = data;
				info.callback(data);
			}
		},
		reset: function reset() {
			this.loaded = {};
		}
	};

	return Loader;
}();
