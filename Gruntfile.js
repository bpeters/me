module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            react: {
                files: ['react/**/*.jsx','react/actions/*.js','react/stores/*.js'],
                tasks: ['browserify']
            }
        },

        browserify: {
            options: {
                transform: [ require('grunt-react').browserify ]
            },
            client: {
                src: ['react/**/*.jsx'],
                dest: 'public/js/browserify/bundle.js'
            }
        },
        nodemon: {
            dev: {
                script: 'app.js',
                options:{
                    ext:'js,jsx,html'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.registerTask('default', [
        'browserify',
        'nodemon'
    ]);
};
