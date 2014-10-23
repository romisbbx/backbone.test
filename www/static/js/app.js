WebApp.App = Backbone.Marionette.Application.extend({
	config: window.WebApp.config,

	init: function () {
		console.log('App init');

		this.views = {};
		this.models = {};
		this.collections = {};

		this.layouts = {
			'window': $(window),
			'document': $(document),
			'wrapper': $('body'),
			'htmlBody': $('body, html'),
			'header': $('#js-header'),
			'panelTop': $('#js-panel-top'),
			'panelMid': $('#js-panel-mid'),
			'panelBottom': $('#js-panel-bottom'),
			'panelNavigation': $('#js-panel-navigation'),
			'content': $('#js-content'),
			'loader': $('#js-loader')
		};

		this.scrollbarWidth = this.getScrollBarWidth();

		// Следим за кликами по ajax ссылкам
		this.layouts.wrapper
			.addClass('appIsReady')
			.on('click', '.js-ajax', function(event) {
				App.router.navigate(event.currentTarget.getAttribute('href'), {
					trigger: true
				});
				return false;
			});

		window.onerror = this._bind(this.errorHandler, this);
	},

	renderTemplate: function (name, data, callback) {
		data = _.extend(data, {
			'hashUrl': App.hashUrl,
			'isJs': true
		});

		var template = twig({ ref: name });

		if (template) {
			if (callback && typeof(callback) === 'function') {
				callback(template.render(data));
			}
		} else {
			twig({
				id: name,
				href: '/tpl/' + name + '.twig',
				load: function (template) {
					if (callback && typeof(callback) === 'function') {
						callback(template.render(data));
					}
				}
			});
		}
	},

	// Метод который полностью подменяет контекст вызова у переданной функции на тот что был передан
	// в параметрах.
	// Более быстрая альтернатива универсальному `fn.bind(context)` (http://jsperf.com/bind-experiment-2)
	//
	// __Пример:__
	//
	//         var a = {
	//             handler: core._bind(fn, context)
	//         }
	_bind: function(fn, context) {
		context || (context = window);

		if (typeof(fn) === 'function') {
			return function() {
				return fn.apply(context, arguments);
			};
		}
		return false;
	},

	// XSS filter
	xssCorrect: function(value) {
		return value.replace(/[<>(){};]/g, '');
	},

	// Метод который получает текущий роутинг и выдает его в более удобном формате для работы
	// разбивая на:
	//
	// * `section` - основная часть роута
	// * `subsection` - дополнительная часть роута
	// * `subsection2`
	// * `subsection3`
	//
	getHashUrl: function() {
		var fragment = decodeURIComponent(Backbone.history.getFragment() || 'index'),
			correctFragment = this.xssCorrect(fragment), // XSS filter
			data = correctFragment.split('/') || [];

		if (data[data.length - 1] == '') {
			data.pop();
		}

		return {
			section: data[0] || '',
			subsection: data[1] || '',
			subsection2: data[2] || '',
			subsection3: data[3] || '',
			array: data
		};
	},

	// Кастомный обработчик ошибок с указанием режима дебага или продакшна
	errorHandler: function(message, file, lineNum) {
		if (!this.config.debugMode) {
			return true;
		} else {
			alert('"' + message + '" on line: ' + lineNum + ' in ' + file);
			return false;
		}
	},

	// Делит массив @array на @count подмассивов
	splitArray: function (array, count) {
		var returnData = {},
			groupeLen, // количество элементов в группе
			index = 0, // индекс групп
			groupeI = 0; // счетчик внутри группы

		if (array && array.length) {
			count = Math.min(count, array.length);
			groupeLen = Math.ceil(array.length / count);

			for (var i = 0, max = array.length; i < max; i++) {
				if (!groupeI) {
					returnData[index] = [];
				}

				returnData[index].push(array[i]);

				if (groupeI >= groupeLen - 1) {
					groupeI = 0;
					index++;
				} else {
					groupeI++;
				}
			}

			return returnData;
		} else {
			return false;
		}
	},

	// Метод получает ширину скролбара
	getScrollBarWidth: function() {
		var inner = document.createElement('p'),
			outer = document.createElement('div'),
			w1, w2;

		inner.style.width = '100%';
		inner.style.height = '200px';

		outer.style.position = 'absolute';
		outer.style.top = '0px';
		outer.style.left = '0px';
		outer.style.visibility = 'hidden';
		outer.style.width = '200px';
		outer.style.height = '150px';
		outer.style.overflow = 'hidden';

		outer.appendChild(inner);
		document.body.appendChild(outer);

		w1 = inner.offsetWidth;
		outer.style.overflow = 'scroll';
		w2 = inner.offsetWidth;

		if (w1 == w2) {
			w2 = outer.clientWidth;
		}

		document.body.removeChild(outer);

		return (w1 - w2);
	},

	// анимирует полет копии элемента в заданную точку с заданными размерами
	flight: function (elem, x, y, width, height, callback) {
		var newElem = elem.clone(),
			currentPos = elem.offset();

		newElem
			.css({
				left: currentPos.left - 5,
				top: currentPos.top
			})
			.addClass('flightAnimation');

		App.layouts.wrapper.append(newElem);

		TweenMax.to(newElem, 0.2, {css:{width: '+=20', height: '+=20'}, ease: Cubic.easeIn, onComplete: function () {
			TweenMax.to(newElem, 0.6, {css:{width: width, height: height}, ease: Cubic.easeIn});
		}});

		TweenMax.to(newElem, 0.8, {css: {
			bezier: [
				{left: '+=30', top: '+=40'},
				{left: x, top: y}
			]
		}, ease: Cubic.easeIn, onComplete: function () {
			newElem.remove();

			if (callback && typeof(callback) === 'function') {
				callback();
			}
		}});
	},

	getRandomInt: function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	// Подсвечивает вхождение @term в строке @value
	highlight: function (value, term) {
		return value.replace(new RegExp('(?![^&;]+;)(?!<[^<>]*)(' + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, '\\$1') + ')(?![^<>]*>)(?![^&;]+;)', 'gi'), function (q) {
			return ['<strong>', q, '</strong>'].join('');
		});
	},

	navigate: function (url) {
		App.router.navigate(url, {
			trigger: true
		});
	}
});