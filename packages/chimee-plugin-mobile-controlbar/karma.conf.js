// Karma configuration
// Generated on Thu Aug 03 2017 16:41:10 GMT+0800 (CST)

const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const replace = require('rollup-plugin-replace');
// PostCSS plugins
const cssnext = require('postcss-cssnext');

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      {pattern: 'src/**.js', watched: false},
      {pattern: '__test__/**/**.js', watched: true},
    ],

    // list of files to exclude
    exclude: [
      'node_modules/*'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**.js': ['rollup', 'coverage'],
      '__test__/**/**.js': ['rollup']
    },
    rollupPreprocessor: {
      plugins: [
        postcss({
          plugins: [
            cssnext()
          ],
          extensions: ['.css']
        }),
        babel({
          presets: ['es2015-rollup', 'stage-0'],
          plugins: [
            'transform-decorators-legacy',
            'transform-runtime'
          ],
          exclude: 'node_modules/**',
          runtimeHelpers: true,
          babelrc: false
        }),
        resolve(),
        commonjs(),
        replace({
          'process.env.NODE_ENV': '"production"'
        })
      ],
      format: 'iife',
      name: 'controlbar',
      sourcemap: 'inline'
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type: 'html',
      dir: 'coverage/',
      subdir (browser) {
        return browser.toLowerCase().split(/[ /-]/)[0];
      }
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    client: {
      captureConsole: true
    }
  });
};
