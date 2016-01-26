module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7
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

        responsive_images: {
            thumbs: {
                options: {
                    sizes: [{
                        width: 450,
                        height: 250,
                        aspectRatio: true,
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['media/compressed/posts/thumbs/*.{jpg,gif,png}'],
                    cwd: '',
                    dest: 'media/compressed/thumbs/'
                }]
            },
            opengraph: {
                options: {
                    sizes: [{
                        width: 484,
                        height: 252,
                        aspectRatio: true,
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['media/compressed/posts/thumbs/*.{jpg,gif,png}'],
                    cwd: '',
                    dest: 'media/compressed/opengraph/'
                }]
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
                files: ["sass/{,*/}{,*/}{,*/}*.scss"],
                tasks: ["copy:css"]
            },
            images: {
                files: ["images/{,*/}{,*/}{,*/}*.{png,jpg}"],
                tasks: ["newer:imagemin", "responsive_images", "shell:jekyllBuild", "copy"]
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
                command: "jekyll serve  --no-watch"
            },
            jekyllBuild: {
                command: "jekyll build"
            }
        }
    });

    grunt.registerTask("serve", ["shell:jekyllServe"]);
    grunt.registerTask("default", ["newer:imagemin", "responsive_images", "shell:jekyllBuild", "copy", "open", "watch"]);
    grunt.registerTask("build", ["imagemin", "responsive_images", "shell:jekyllBuild", "copy"]);
    grunt.registerTask("deploy", ["buildcontrol:pages"]);
};
