module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['mochaTest', 'jshint']);
    grunt.registerTask('run',
        'Run the tests, compile the API models, browserify the client-side code',
        ['clean', 'execute', 'mochaTest', 'copy', 'browserify', 'less', 'connect']);

    grunt.initConfig({
        mochaTest : {
            test : {
                options : {
                    reporter : 'spec',
                    quiet : false,
                    clearRequireCache : false
                },
                src : ['test/**/*.js']
            }
        },

        browserify : {
            main : {
                src : 'src/js/*.js',
                dest : 'dist/js/bundle.js'
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
                    keepalive: true,
                    base: 'dist'
                }
            }
        },

        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "dist/styles/style.css": "src/styles/style.less"
                }
            }
        },

        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },

        clean: ['dist'],

        jshint: {
            files: {
                src: ['Gruntfile.js', 'src/js/**/*.js', 'src/pre/**/*.js', 'test/**/*.js']
            }
        }
    });
};