var path = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      vendor: {
        files: [
          {
            expand: true, cwd: 'node_modules/bootstrap/',
            src: ['js/**', 'less/**'], dest: 'public/drywall/vendor/bootstrap/'
          },
          {
            expand: true, cwd: 'node_modules/backbone/',
            src: ['backbone.js'], dest: 'public/drywall/vendor/backbone/'
          },
          {
            expand: true, cwd: 'node_modules/font-awesome/',
            src: ['fonts/**', 'less/**'], dest: 'public/drywall/vendor/font-awesome/'
          },
          {
            expand: true, cwd: 'node_modules/html5shiv/dist/',
            src: ['html5shiv.js'], dest: 'public/drywall/vendor/html5shiv/'
          },
          {
            expand: true, cwd: 'node_modules/jquery/dist/',
            src: ['jquery.js'], dest: 'public/drywall/vendor/jquery/'
          },
          {
            expand: true, cwd: 'node_modules/jquery.cookie/',
            src: ['jquery.cookie.js'], dest: 'public/drywall/vendor/jquery.cookie/'
          },
          {
            expand: true, cwd: 'node_modules/moment/',
            src: ['moment.js'], dest: 'public/drywall/vendor/momentjs/'
          },
          {
            expand: true, cwd: 'node_modules/respond.js/src/',
            src: ['respond.js'], dest: 'public/drywall/vendor/respond/'
          },
          {
            expand: true, cwd: 'node_modules/underscore/',
            src: ['underscore.js'], dest: 'public/drywall/vendor/underscore/'
          }
        ]
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          ignore: [
            'node_modules/**',
            'public/drywall/**'
          ],
          ext: 'js'
        }
      }
    },
    watch: {
      clientJS: {
         files: [
          'public/drywall/layouts/**/*.js', '!public/drywall/layouts/**/*.min.js',
          'public/drywall/views/**/*.js', '!public/views/**/*.min.js'
         ],
         tasks: ['newer:uglify', 'newer:jshint:client']
      },
      serverJS: {
         files: ['views/**/*.js'],
         tasks: ['newer:jshint:server']
      },
      clientLess: {
         files: [
          'public/drywall/layouts/**/*.less',
          'public/drywall/views/**/*.less',
          'public/drywall/less/**/*.less'
         ],
         tasks: ['newer:less']
      },
      layoutLess: {
        files: [
          'public/drywall/layouts/**/*.less',
          'public/drywall/less/**/*.less'
        ],
        tasks: ['less:layouts']
      }
    },
    uglify: {
      options: {
        sourceMap: true,
        sourceMapName: function(filePath) {
          return filePath + '.map';
        }
      },
      layouts: {
        files: {
          'public/drywall/layouts/core.min.js': [
            'public/drywall/vendor/jquery/jquery.js',
            'public/drywall/vendor/jquery.cookie/jquery.cookie.js',
            'public/drywall/vendor/underscore/underscore.js',
            'public/drywall/vendor/backbone/backbone.js',
            'public/drywall/vendor/bootstrap/js/affix.js',
            'public/drywall/vendor/bootstrap/js/alert.js',
            'public/drywall/vendor/bootstrap/js/button.js',
            'public/drywall/vendor/bootstrap/js/carousel.js',
            'public/drywall/vendor/bootstrap/js/collapse.js',
            'public/drywall/vendor/bootstrap/js/dropdown.js',
            'public/drywall/vendor/bootstrap/js/modal.js',
            'public/drywall/vendor/bootstrap/js/tooltip.js',
            'public/drywall/vendor/bootstrap/js/popover.js',
            'public/drywall/vendor/bootstrap/js/scrollspy.js',
            'public/drywall/vendor/bootstrap/js/tab.js',
            'public/drywall/vendor/bootstrap/js/transition.js',
            'public/drywall/vendor/momentjs/moment.js',
            'public/drywall/layouts/core.js'
          ],
          'public/drywall/layouts/ie-sucks.min.js': [
            'public/drywall/vendor/html5shiv/html5shiv.js',
            'public/drywall/vendor/respond/respond.js',
            'public/drywall/layouts/ie-sucks.js'
          ],
          'public/drywall/layouts/admin.min.js': ['public/drywall/layouts/admin.js']
        }
      },
      views: {
        files: [{
          expand: true,
          cwd: 'public/drywall/views/',
          src: ['**/*.js', '!**/*.min.js'],
          dest: 'public/drywall/views/',
          ext: '.min.js'
        }]
      }
    },
    jshint: {
      client: {
        options: {
          jshintrc: '.jshintrc-client',
          ignores: [
            'public/drywall/layouts/**/*.min.js',
            'public/drywall/views/**/*.min.js'
          ]
        },
        src: [
          'public/drywall/layouts/**/*.js',
          'public/drywall/views/**/*.js'
        ]
      },
      server: {
        options: {
          jshintrc: '.jshintrc-server'
        },
        src: [
          'schema/**/*.js',
          'views/**/*.js'
        ]
      }
    },
    less: {
      options: {
        compress: true
      },
      layouts: {
        files: {
          'public/drywall/layouts/core.min.css': [
            'public/drywall/less/bootstrap-build.less',
            'public/drywall/less/font-awesome-build.less',
            'public/drywall/layouts/core.less'
          ],
          'public/drywall/layouts/admin.min.css': ['public/drywall/layouts/admin.less']
        }
      },
      views: {
        files: [{
          expand: true,
          cwd: 'public/drywall/views/',
          src: ['**/*.less'],
          dest: 'public/drywall/views/',
          ext: '.min.css'
        }]
      }
    },
    clean: {
      js: {
        src: [
          'public/drywall/layouts/**/*.min.js',
          'public/drywall/layouts/**/*.min.js.map',
          'public/drywall/views/**/*.min.js',
          'public/drywall/views/**/*.min.js.map'
        ]
      },
      css: {
        src: [
          'public/drywall/layouts/**/*.min.css',
          'public/drywall/views/**/*.min.css'
        ]
      },
      vendor: {
        src: ['public/drywall/vendor/**']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('default', ['copy:vendor', 'newer:uglify', 'newer:less', 'watch']);
  grunt.registerTask('build', ['copy:vendor', 'uglify', 'less']);
  grunt.registerTask('lint', ['jshint']);
};
