var p = require('path');
var gutils = require('gulp-util');

var config = {

    tasks: [],
    production: !! gutils.env.production,
    assetsPath: 'assets', // YOUR ASSET PATH (PARSCLICK)
    publicPath: 'public', // YOUR OUTPUT PATH (PARSCLICK)
    appPath: 'app', // YOUR APPLICATION FOLDER (PARSCLICK)
    sourcemaps: ! gutils.env.production,
    batchOptions: {
        // https://github.com/floatdrop/gulp-batch#batchoptions-callback-errorhandler
        limit: undefined,
        timeout: 1000
    },

    css: {
        folder: 'css', // YOUR CSS ASSET PATH (PARSCLICK)
        outputFolder: 'css', // YOUR CSS OUTPUT PATH (PARSCLICK)
        autoprefix: {
            enabled: true,
            // https://www.npmjs.com/package/gulp-autoprefixer#api
            options:  {
                browsers: ['last 2 versions'],
                cascade: false
            }
        },
        minifyCss: {
            // https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-api
            pluginOptions: {
                processImport: false
            }
        },
        sass: {
            folder: 'sass', // YOUR SASS ASSET PATH (PARSCLICK)
            // https://github.com/sass/node-sass#options
            pluginOptions: {
                outputStyle: gutils.env.production
                    ? 'compressed'
                    : 'nested',
                precision: 10
            }
        },
        less: {
            folder: 'less', // YOUR LESS ASSET PATH (PARSCLICK)
            // https://github.com/plus3network/gulp-less#options
            pluginOptions: {}
        }
    },

    js: {
        folder: 'js', // YOUR CSS ASSET PATH (PARSCLICK)
        outputFolder: 'js', // YOUR CSS OUTPUT PATH (PARSCLICK)
        babel: {
            // https://www.npmjs.com/package/gulp-babel#babel-options
            options: {
                stage: 2,
                compact: false
            }
        },
        browserify: {
            // https://www.npmjs.com/package/browserify#usage
            options: {},
            plugins: [],
            transformers: [
                {
                    name: 'babelify',
                    // https://www.npmjs.com/package/gulp-babel#babel-options
                    options: {
                        stage: 2,
                        compact: false
                    }
                },
                {
                    name: 'partialify',
                    // https://www.npmjs.com/package/partialify
                    options: {}
                },
                {
                    name: 'vueify',
                    // https://github.com/vuejs/vueify#usage
                    options: {}
                }
            ],
            watchify: {
                enabled: false,
                // https://www.npmjs.com/package/watchify#usage
                options: {}
            }
        },
        coffee: {
            folder: 'coffee',
            // https://github.com/wearefractal/gulp-coffee#options
            options: {}
        }
    },
    testing: {
      phpUnit: {
            path: 'tests',

            // https://www.npmjs.com/package/gulp-phpunit#api
            options: {
                debug: true,
                notify: true,
                configurationFile: 'phpunit.xml'
            }
        },
        phpSpec: {
            path: 'spec',
            // https://www.npmjs.com/package/gulp-phpspec#api
            options: {
                verbose: 'v',
                notify: true
            }
        }
    },
    versioning: {
        buildFolder: 'build'
    },
    browserSync: {
        // http://www.browsersync.io/docs/options/
        proxy: 'homestead.app',
        reloadOnRestart : true,
        notify: true,
    },
};


/**
 * Fetch a config item, using a string dot-notation.
 *
 * @param  {string} path
 * @return {string}
 */
config.get = function(path) {
    var basePath;
    var current = config;

    var segments = path.split('.');

    // If the path begins with "assets" or "public," then
    // we can assume that the user wants to prefix the
    // given base url to their config path. Useful!

    if (segments[0] == 'assets' || segments[0] == 'public') {
        basePath = config[segments.shift()+'Path'];
    }

    segments.forEach(function(segment) {
        current = current[segment];
    });

    return p.join(basePath, current);
};


module.exports = config;
