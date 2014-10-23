<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]> <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]> <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>Backbone.test</title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width">

	<link type="text/css" rel="stylesheet" href="/static/css/global.css" media="screen" />
	<link type="text/css" rel="stylesheet" href="/static/css/main.css" media="screen" />

	<script type="text/javascript" src="/static/js/app.loader.js"></script>
	<script type="text/javascript">
		WebApp.config = {
			debugMode: false,
			debugEvent: false,
			locations: {
				js: '/static/js/',
				jsBuild: '/static/_build/js/',
				css: '/static/_build/css/',
				img: '/static/img/',
				api: '/api/'
			}
		};

		if (window.location.host == 'backbone.test.local') {
			WebApp.config.debugMode = true;
		}
	</script>
	<script type="text/javascript" src="/static/js/files.js"></script>
	<script type="text/javascript">
		new WebApp.Loader();
	</script>
</head>
<body>
	<!--[if lt IE 7]>
		<p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
	<![endif]-->

	<div class="header" id="js-header"></div>
	<div class="panel" id="js-panel-top"></div>
	<div class="panel -mid" id="js-panel-mid"></div>
	<div class="panel" id="js-panel-bottom"></div>
	<div class="panel" id="js-panel-navigation"></div>
	<div class="content" id="js-content"></div>
	<div class="loader icon-loader" id="js-loader"></div>

</body>
</html>