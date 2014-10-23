WebApp.Router = Backbone.Marionette.AppRouter.extend({
	viewsOnAllPages: ['Header'],

	routes: {
		'': 'index',
		'/': 'index',
		'index': 'index',
		'index/': 'index'
	},

	initialize: function () {
		this.on('route:before_loadUrl', App._bind(function () {
			App.hashUrl = App.getHashUrl();
			console.log(App.hashUrl);
		}, this));
	},

	run: function (name, options) {
		options = options || {};

		if (!App.views[name]) {
			App.views[name] = new WebApp.Views[name](options);
		}
	},

	// TODO: это временное решение
	removeViews: function () {
		_.each(App.views, App._bind(function (item, key) {
			if (_.indexOf(this.viewsOnAllPages, key) < 0) {
				item.close();
				delete App.views[key];
			}
		}, this));
	},
	
	index: function () {
		this.removeViews();
		this.run('Header');
		this.run('Index');
	}
});
