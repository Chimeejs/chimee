const path = require('path');
const { version, name } = require('./package.json');
const { camelize } = require('toxic-utils');

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [ 'mocha' ],

    // list of files / patterns to load in the browser
    files: [ 'tests/index.js' ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'tests/index.js': [ 'rollup', 'sourcemap' ],
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [ 'mocha', 'coverage-istanbul' ],

    coverageIstanbulReporter: {
      reports: [ 'lcov', 'text-summary' ],
    },

    rollupPreprocessor: {
      plugins: [
        require('rollup-plugin-babel')(),
        require('rollup-plugin-flow-no-whitespace')(),
        require('rollup-plugin-node-resolve')({
          customResolveOptions: {
            moduleDirectory: [ 'src', 'node_modules' ],
          },
        }),
        require('rollup-plugin-commonjs')(),
        require('rollup-plugin-replace')({
          'process.env.VERSION': `'${version}'`,
        }),
      ],
      format: 'iife', // Helps prevent naming collisions.
      name: camelize(name), // Required for 'iife' format.
      sourcemap: 'inline', // Sensible for testing.
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [ 'ChromeHeadless' ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
