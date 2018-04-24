// process.env.CHROME_BIN = require('puppeteer').executablePath();
const esmRequire = require('@std/esm')(module, {
  mode: 'all',
  cjs: {
    vars: true,
  },
});
const { name } = require('./package.json');
const { camelize } = require('toxic-utils');
const base = esmRequire('./build/rollup.config.base').default;
const rollupConfig = base('iife');
const replace = require('rollup-plugin-replace');
rollupConfig.plugins.unshift(replace({
  'process.env.NODE_ENV': '"development"',
}));

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [ 'mocha', 'chai' ],

    // list of files / patterns to load in the browser
    files: [
      'tests/**/*.js',
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'tests/**/*.js': [ 'rollup' ],
      'src/**/*.js': [ 'rollup' ],
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [ 'mocha', 'progress' ],

    rollupPreprocessor: {
      output: {
        format: 'iife', // Helps prevent naming collisions.
        name: camelize(name), // Required for 'iife' format.
      },
      plugins: rollupConfig.plugins,
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    // colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [ 'FirefoxHeadless' ],

    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: [ '-headless' ],
      },
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
