module.exports = function(grunt) {

     // Load the Grunt plugins.
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadNpmTasks('grunt-mocha-test');

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
        }
    });

    grunt.registerTask('default', 'mochaTest');

};
