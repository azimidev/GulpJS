var elixir = require('laravel-elixir');

// YOUR CSS FILES WILL BE       : all.css
// YOUR JAVASCRIP FILES WILL BE : all.js

elixir(function(mix) {
	// mix.sass('app.scss' , "new_direcroty")
	// mix.less('app.less' , "new_direcroty")
	mix.less([
		   'bootstrap.less',
	   ], "public/css")
	   .styles([
		   'app.css',
		   'font-awesome.min.css'
	   ])
	   .scripts([
		   'jquery.js',
		   'affix.js',
		   'transition.js',
		   'tooltip.js',
		   'alert.js',
		   'button.js',
		   'carousel.js',
		   'collapse.js',
		   'dropdown.js',
		   'popover.js',
		   'scrollspy.js',
		   'modal.js',
		   'tab.js',
		   '_myscript.js'
	   ])
		// TDD: type `gulp tdd` in command line to track your test
		// .phpSpec()
		// .phpUnit()
	;
});
