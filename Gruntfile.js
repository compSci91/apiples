module.exports = function(grunt) {

     // Load the Grunt plugins.
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', 'mochaTest');

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
        }
    });


};