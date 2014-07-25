'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      standalone: {
        src: [ 'lib/<%= pkg.name %>.js' ],
        dest: './build/browser/<%= pkg.name %>.standalone.js',
        options: {
          bundleOptions: {
            standalone: '<%= pkg.name %>'
          }
        }
      },
      require: {
        src: [ 'lib/<%= pkg.name %>.js' ],
        dest: './build/browser/<%= pkg.name %>.require.js',
        options: {
          alias: [ './lib/<%= pkg.name %>.js:' ]
        }
      },
      tests: {
        src: [ 'test/browser/suite.js' ],
        dest: './build/browser/<%= pkg.name %>.tests.js',
        options: {
          external: [ './lib/<%= pkg.name %>.js' ],
          debug: true // embed source maps
        }
      }
    },

    connect: {
      server: {},
    },

    jshint: {
      files: [
        '**/*.js',
        '!node_modules/**/*',
        '!build/**/*'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    'mocha_phantomjs': {
      all: {
        options: {
          urls: [
            'http://127.0.0.1:8000/test/browser/index.html'
            ]
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'build/browser/<%= pkg.name %>.standalone.min.js':
            ['<%= browserify.standalone.dest %>'],
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');

  grunt.registerTask('default', [
    'jshint',
    'browserify',
    'uglify',
    'connect',
    'mocha_phantomjs',
  ]);

};
