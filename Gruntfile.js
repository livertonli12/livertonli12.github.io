module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        tinyimg: {
          dynamic: {
            files: [{
              expand: true,
              cwd: './images',
              src: ['**/*.{png,jpg}'],
              dest: 'media/compressed/'
            }]
          }
        },

        image: {
          dynamic: {
            options: {
              pngquant: true,
              optipng: true,
              zopflipng: true,
              advpng: true,
              jpegRecompress: true,
              jpegoptim: true,
              mozjpeg: true,
              gifsicle: true,
              svgo: true
            },
            files: [{
              expand: true,
              cwd: './images',
              src: ['**/*.{png,jpg,gif,svg}'],
              dest: 'media/compressed/'
            }]
          }
        },

        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7,
                    progressive: true
                },
                files: [
                    {
                        // Set to true to enable the following options…
                        expand: true,
                        // cwd is 'current working directory'
                        cwd: './images',
                        src: ['**/*.png'],
                        // Could also match cwd line above. i.e. project-directory/img/
                        dest: 'media/compressed/',
                        flatten: false,
                        ext: '.png'
                    }
                ]
            },
            jpg: {
                options: {
                    optimizationLevel: 5,
                    progressive: true
                },
                files: [
                    {
                        // Set to true to enable the following options…
                        expand: true,
                        // cwd is 'current working directory'
                        cwd: './images',
                        src: ['**/*.jpg', '**/*.jpeg'],
                        // Could also match cwd. i.e. project-directory/img/
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
                        src: ['js/build/**'],
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

        buildcontrol: {
            options: {
                dir: 'jekyllbuild',
                commit: true,
                push: true,
                message: 'Built jekyllbuild from commit %sourceCommit% on branch %sourceBranch%'
            },
            pages: {
                options: {
                    remote: 'git@github.com:DigitalMindCH/gridster-jekyll-theme.git', // change that
                    branch: 'gh-pages' // adjust here
                }
            }
        },

        shell: {
            jekyllServe: {
                command: "jekyll serve --no-watch"
            },
            jekyllBuild: {
                command: "jekyll build"
            }
        }
    });

    grunt.registerTask("serve", ["shell:jekyllServe"]);
    grunt.registerTask("default", ["tinyimg", "shell:jekyllBuild", "copy", "open", "watch"]);
    grunt.registerTask("build", ["image", "responsive_images", "shell:jekyllBuild", "copy"]);
    grunt.registerTask("deploy", ["buildcontrol:pages"]);
};
