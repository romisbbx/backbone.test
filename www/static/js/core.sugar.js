// Набор расширений для `Backbone` и `Marionette`


// Добавляем декодер фрагмента url
// для корректной работы с русскими символами в url
Backbone.History.prototype.getFragment = (function(fn) {
	return function (options) {
		var fragment = fn.apply(this, arguments);
		return decodeURIComponent(fragment)
	};
})(Backbone.History.prototype.getFragment);

// Расширяем прототип роутера в _Backbone.js_
// -------------
//
// Добавляем события об изменении роута
Backbone.Router.prototype.navigate = function(fragment, options) {
	// Сохраняем выставляемый роут в переменную хранящую последний изменяемый роут
	this.latestFragment = fragment;

	// Тригерим событие о начале изменения роута передавая в параметрах предыдущий и текущий роут
	this.trigger('route:before_change', this.prevRoute, fragment);

	// Вызываем изменение роута
	Backbone.history.navigate(fragment, options);

	// Если выставляемый роут соотвествует последнему изменяемому роуту, то тригерим событие о
	// начале изменения роута.
	// В противном случае в процессе изменения роута было произведено еще одно изменение и текущее
	// событие уже не актуально, по этому мы его игнорируем.
	if (fragment == this.latestFragment) {
		this.trigger('route:after_change', this.prevRoute, fragment);

		// Сохраняем новые значения предыдущего и текущего роута
		this.prevRoute = fragment;
	}
};

// Добавляем событие перед подгрузкой url
Backbone.History.prototype.loadUrl = (function(fn) {
	return function (fragment) {
		App.router.trigger('route:before_loadUrl');
		return fn.apply(this, arguments);
	};
})(Backbone.History.prototype.loadUrl);