var gulp 				= require('gulp'),
		gutil 			= require('gulp-util'),
		coffee 			= require('gulp-coffee'),
		concat 			= require('gulp-concat')
		browserify 		= require('gulp-browserify'),
		compass 		= require('gulp-compass'),
		minifyCSS 		= require('gulp-minify-css'),
		uglify		 	= require('gulp-uglify'),
		minifyHTML		= require('gulp-minify-html'),
		jsonminify		= require('gulp-jsonminify'),
		imagemin		= require('gulp-imagemin'),
		pngquant		= require('imagemin-pngquant'),
		gulpif 			= require('gulp-if'),
		connect 		= require('gulp-connect');

var coffeeSources,
		jsSources,
		sassSources,
		htmlSources,
		jsonSources,
		env,
		outputDir;

env = process.env.NODE_ENV || 'development';

if( env === 'development' ) {
	outputDir = 'builds/development/';
} else {
	outputDir  = 'builds/production/';
}

coffeeSources = ['components/coffee/tagline.coffee'];
jsSources 		= [
	'components/scripts/rclick.js',
	'components/scripts/pixgrid.js',
	'components/scripts/tagline.js',
	'components/scripts/template.js'
];
sassSources = ['components/sass/style.scss'];
htmlSources = [outputDir + '*.html'];
jsonSources = [outputDir + 'js/*.json'];

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
		.pipe( gulpif( env === 'production', uglify() ) )
		.pipe( gulp.dest( outputDir + 'js' ) )
		.pipe( connect.reload() )
});

gulp.task( 'compass', function() {
	gulp.src( sassSources )
		.pipe( compass({
			sass 	: 'components/sass',
			image : outputDir + 'images'
		}))
		.pipe( gulpif( env === 'production', minifyCSS() ) )
			.on( 'error', gutil.log )
		.pipe( gulp.dest( outputDir + 'css' ) )
		.pipe( connect.reload() )
});

gulp.task('html', function() {
	gulp.src( 'builds/development/*.html' )
		.pipe( gulpif( env === 'production', minifyHTML() ) )
		.pipe( gulpif( env === 'production', gulp.dest(outputDir) ) )
		.pipe( connect.reload() )
});

gulp.task('json', function() {
	gulp.src( 'builds/development/js/*.json' )
		.pipe( gulpif( env === 'production', jsonminify() ) )
		.pipe( gulpif( env === 'production', gulp.dest(outputDir + 'js') ) )
		.pipe( connect.reload() )
});

gulp.task('images', function() {
	gulp.src( 'builds/development/images/**/*.*' )
		.pipe( gulpif( env === 'production', imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe( gulpif( env === 'production', gulp.dest(outputDir + 'images') ) )
		.pipe( connect.reload() )
});

gulp.task( 'connect', function() {
	connect.server({
		root: outputDir,
    livereload: true
	});
});

gulp.task( 'watch', function() {
	gulp.watch( coffeeSources, ['coffee'] );
	gulp.watch( jsSources, ['js'] );
	gulp.watch( 'components/sass/*.scss', ['compass'] );
	gulp.watch( 'builds/development/*.html', ['html'] );
	gulp.watch( 'builds/development/js/*.json', ['json'] );
	gulp.watch( 'builds/development/images/**/*.*', ['images'] );
});


gulp.task('default', ['html', 'json' ,'coffee', 'js', 'compass', 'images', 'connect', 'watch']);





