WebApp.Views.Index = Backbone.Marionette.View.extend({
	template: 'index',

	initialize: function () {
		this.render();
	},

	render: function () {
		App.renderTemplate(this.template, {
			title: 'Заголовок',
			content: 'Текст'
		}, App._bind(function (html) {
			App.layouts.content
				.append(this.$el.html(html));
		}, this));
	}
});