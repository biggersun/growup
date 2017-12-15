// Karma configuration
// Generated on Thu Dec 14 2017 16:01:18 GMT+0800 (CST)
const webpackConfiguration = require('./webpack.config');

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],

    // list of files / patterns to load in the browser
    files: [
      // 'node_modules/babel-polyfill/dist/polyfill.js',
      'src/**/*.js',
      'test/**/*.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.js': ['webpack', 'coverage'],
      'test/**/*.spec.js': ['webpack']
    },

    // babelPreprocessor: {
    //   filename: function (file) {
    //     console.log('filename', file);
    //     return file.originalPath.replace(/\.js$/, '.es5.js');
    //   },
    //   sourceFileName: function (file) {
    //     console.log('sourceFileName', file);
    //     return file.originalPath;
    //   }
    // },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

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

    coverageReporter: {
      reporters:[
        {type: 'html', dir: 'coverage/'},
        {type: 'text-summary'}
      ],
    },

    webpack: webpackConfiguration,

    webpackMiddleware: {},
  })
}
