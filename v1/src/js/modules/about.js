define('modules/about', [], function() {
	function tmpModule(defaults) {
		Module.call(this, {
			templates : {
			},
			dom : {
				container : null
			},
			init: function(defaults) {
				console.log("About.init");
			}
		});
	}
	return tmpModule;
});

