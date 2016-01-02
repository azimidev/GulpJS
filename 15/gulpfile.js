var gulp 				= require('gulp'),
		gutil 			= require('gulp-util'),
		coffee 			= require('gulp-coffee'),
		concat 			= require('gulp-concat')
		browserify 	= require('gulp-browserify'),
		compass 		= require('gulp-compass'),
		minifyCSS 	= require('gulp-minify-css'),
		connect 		= require('gulp-connect');

var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources 		= [
	'components/scripts/rclick.js',
	'components/scripts/pixgrid.js',
	'components/scripts/tagline.js',
	'components/scripts/template.js'
];
var sassSources = ['components/sass/style.scss'];

gulp.task( 'coffee', function() {
	gulp.src( coffeeSources )
		.pipe( coffee ({ bare: true } ))
			.on( 'error', gutil.log )
		.pipe( gulp.dest( 'components/scripts' ) )
});

gulp.task( 'js', function() {
	gulp.src( jsSources )
		.pipe( concat( 'scripts.js' ) )
		.pipe( browserify() )
		.pipe( gulp.dest( 'builds/development/js' ) )
		.pipe( connect.reload() )
});

gulp.task( 'compass', function() {
	gulp.src( sassSources )
		.pipe( compass({
			sass 	: 'components/sass',
			image : 'builds/development/images'
		}))
		// .pipe(minifyCSS())
			.on( 'error', gutil.log )
		.pipe( gulp.dest( 'builds/development/css' ) )
		.pipe( connect.reload() )
});

gulp.task( 'connect', function() {
	connect.server({
		root: 'builds/development/',
    livereload: true
	});
});

gulp.task( 'watch', function() {
	gulp.watch( coffeeSources, ['coffee'] ),
	gulp.watch( jsSources, ['js'] ),
	gulp.watch( 'components/sass/*.scss', ['compass'] )
});


gulp.task('default', ['coffee', 'js', 'compass', 'connect', 'watch']);





