// Список файлов необходимый для работы веб-приложения.
// Используется для генерации минифицированных js файлов и для загрузки файлов в "debugMode = true"

// (!) Все ключи и значения должны быть обязательно обрамлены в двойные ковычки `"` иначе _node.js_ не
// (!) сможет его распарсить.

WebApp.resources = {
	"libs": [
		"libs/modernizr.min.js",
		"libs/jquery/jquery.min.js",
		"libs/lodash.min.js",
		"libs/backbone.min.js",
		"libs/backbone.marionette.min.js",
		"libs/twig.min.js",

		"libs/jquery/jquery.cookie.min.js",
		"libs/jquery/jquery.mockjson.js"
	],

	"app": [
		"app.js",
		"core.sugar.js",
		"router.js",

		"helpers/twig.js",
		"helpers/mock.js",

		"views/header.js",
		"views/index.js"
	]
}