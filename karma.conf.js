var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
    config.set({
        frameworks: ['mocha'],

        files: ['tests/unit/*.spec.js'],

        preprocessors: {
            '**/*.spec.js': ['webpack', 'sourcemap']
        },

        webpack: webpackConfig,

        reporters: ['spec'],

        browsers: ['Chrome'],
        autoWatch:true,
    })
}
