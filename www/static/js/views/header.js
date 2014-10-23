WebApp.Views.Header = Backbone.Marionette.View.extend({
	template: 'header',

	initialize: function () {
		this.setElement(App.layouts.header);
		this.render();

		App.router.on('route', App._bind(this.render, this));
	},

	render: function () {
		App.renderTemplate(this.template, {}, App._bind(function (html) {
			this.$el.html(html);
		}, this));
	}
});
