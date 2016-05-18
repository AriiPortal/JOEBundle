(function () {
	function FileOrderSource(binder)
	{
		this.binder = binder;
	}

	FileOrderSource.prototype = new View();

	FileOrderSource.prototype.setup = function(parent) {
		var formDesc = [
			{ type: 'input', name: 'directory', label: 'Directory' },
			{ type: 'input', name: 'regex', label: 'Regex' },
			{ type: 'checkbox', name: 'alertWhenDirectoryMissing', label: 'Alert when directory missing' },
			{ type: 'nextcolumn' },
			{ type: 'input', name: 'delayAfterError', label: 'Delay After Error' },
			{ type: 'input', name: 'repeat', label: 'Repeat' },
			{ type: 'input', name: 'nextState', label: 'Next State' }
		];
	};
})();
