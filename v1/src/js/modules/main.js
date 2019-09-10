requirejs.config({
	baseUrl: '/assets/js',
	paths: {
		jquery: '/assets/js/vendor/jquery',
		handlebars: '/assets/js/vendor/handlebars',
		underscore: '/assets/js/vendor/underscore',
		backbone: '/assets/js/vendor/backbone',
		partials : '/assets/js/partials',
		templates : '/assets/js/templates',
		'handlebars-helpers': '/assets/js/vendor/handlebars-helpers',
	}
});

//generic module
function Module(defaults) {
	// Assigns properties and methods from specific module
	$.each(defaults, $.proxy(function(k, v) {
		this[k] = v;
	}, this));
}

// Create the app
var App = $.extend(true, App, {
	router : null,
	dom : {
		mainContainer : null
	},
	switching : false,
	currentPageModule : null,
	nextPageModule : null,

	init : function (e) {
		console.log("App.Init");
		this.initRoutes();
		this.dom.mainContainer = $(".application-body");
	},
	initRoutes : function () {
		//router
		var AppRouter = Backbone.Router.extend({
		    routes: {
		        "" : "index",
		        "works/*id" : "works"
		    }
		});

		this.router = new AppRouter;
		this.router.on('route:index', $.proxy(this.showHomePage, this));
		this.router.on('route:works', $.proxy(this.showWorksPage, this));
		Backbone.history.start({pushState: true});
	},
	showHomePage : function() {
		console.log("App.showHomePage");
		if (this.switching) return 0;

		require(["modules/about"], $.proxy(function(module) {
			var page = new module();
			this.switchPage(page);
		}, this));
	},
	showWorksPage : function(_id) {
		console.log("App.showWorksPage");
		if (this.switching) return 0;
	},
	switchPage : function(_newPage) {
		console.log("App.switchPage");
		if (this.switching) return 0;

		console.log(this);
		var p = $(this.templates._about({ title : "Hello!" }));
		p.on("click", "a", $.proxy(function(e)
		{
			e.preventDefault(); // This is important

			var href = $(e.currentTarget).attr('href');

			this.router.navigate(href, true); // <- this part will pass the path to your router
		}, this));

		this.dom.mainContainer.append(p);

		//this.nextPageModule = _newPage;
		//this.switching = true;
		//_newPage.init();
	}
});

// Dependencies
var deps = [
	'handlebars',
	'jquery',
	'backbone',
	'partials',
	'templates'
];

// Main entry point
require(deps, function() {
	console.log("Start initialization...");
	App.init();
});