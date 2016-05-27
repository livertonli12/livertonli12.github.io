module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        htmlmin: {
          dist: {
            options: {
              removeComments: true,
              collapseWhitespace: true
            },
            files: [{
              expand: true,
              cwd: '_site/',
              src: ['**/*.html'],
              dest: '_site/'
            }]
          }
        },

        imagemin: {
            png: {
                options: { optimizationLevel: 3, progressive: true },
                files: [
                    {
                        expand: true,
                        cwd: './images',
                        src: ['**/*.png'],
                        dest: 'media/compressed/',
                        flatten: false,
                        ext: '.png'
                    }
                ]
            },
            jpg: {
                options: { optimizationLevel: 3, progressive: true },
                files: [
                    {
                        expand: true,
                        cwd: './images',
                        src: ['**/*.jpg', '**/*.jpeg'],
                        dest: 'media/compressed/',
                        flatten: false,
                        ext: '.jpg'
                    }
                ]
            }
        },

        copy: {
            css: {
                files: [
                    {
                        expand: true,
                        src: ['css/**'],
                        dest: 'jekyllbuild/'
                    },
                ]
            },
            js: {
                files: [
                    {
                        expand: true,
                        src: ['js/**'],
                        dest: 'jekyllbuild/'
                    },
                ]
            }
        },

        open: {
            build: {
                path: 'http://localhost:4000',
            }
        },

        watch: {
            options: {
                livereload: true
            },
            site: {
                files: ["{,*/}{,*/}{,*/}*.html", "{,*/}{,*/}{,*/}*.md", "{,*/}*.yml", "!jekyllbuild/{,*/}{,*/}*.*", "!node_modules/{,*/}*.*"],
                tasks: ["shell:jekyllBuild", "copy"]
            },
            js: {
                files: ['js/{,*/}{,*/}*.js'],
                tasks: ["copy:js"]
            },
            css: {
                files: ["_sass/{,*/}{,*/}{,*/}*.scss"],
                tasks: ["copy:css"]
            },
            images: {
                files: ["images/{,*/}{,*/}{,*/}*.{png,jpg}"],
                tasks: ["newer:imagemin", "shell:jekyllBuild", "copy"]
            }
        },

        shell: {
            jekyllServe: {
                command: "jekyll serve --watch"
            },
            jekyllBuild: {
                command: "jekyll build"
            }
        }
    });

    grunt.registerTask("serve", ["shell:jekyllServe"]);
    grunt.registerTask("default", ["imagemin", "shell:jekyllBuild", "htmlmin", "copy", "open", "watch"]);
};
