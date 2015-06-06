module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', 'mochaTest');
    grunt.registerTask('run',
        'Run the tests, compile the API models, browserify the client-side code',
        ['mochaTest', 'execute', 'browserify', 'connect']);

    grunt.initConfig({
        mochaTest : {
            test : {
                options : {
                    reporter : 'spec',
                    captureFile : 'results.txt',
                    quiet : false,
                    clearRequireCache : false
                },
                src : ['test/**/*.js']
            }
        },

        browserify : {
            main : {
                src : 'src/js/*.js',
                dest : './bundle.js'
            }
        },

        execute : {
            target : {
                src : ['src/pre/app.js']
            }
        },

        connect : {
            server : {
                options: {
                    port: 9000,
                    keepalive: true
                }
            }
        }
    });
};