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

			var xhr = new XMLHttpRequest();
			xhr.open("GET", url, true);

			this.loading.push({ name: target, callback: callback });

			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					if (xhr.status < 400) {
						eval(xhr.responseText);
					} else {
						console.error("Cannot load  " + target + ": " + xhr.responseText);
					}
				}
			}.bind(this);

			xhr.send();
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