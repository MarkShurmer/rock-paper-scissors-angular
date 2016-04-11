module.exports = function (config) {
    config.set({

        basePath: '',

        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/*.js',
            'app/services/**/*.js',
            'app/game/**/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome', 'PhantomJS'],

        plugins: [
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-coverage'
        ],

        preprocessors: {
            'app/**/!(*Test).js': ['coverage']
        },

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
