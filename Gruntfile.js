'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      standalone: {
        src: [ './src/<%= pkg.name %>.coffee' ],
        dest: './build/<%= pkg.name %>.standalone.js',
        options: {
          bundleOptions: {
            standalone: 'securemsg'
          }
        }
      },
      require: {
        src: [ './src/<%= pkg.name %>.coffee' ],
        dest: './build/<%= pkg.name %>.require.js',
        options: {
          alias: [ './src/<%= pkg.name %>.coffee:' ]
        }
      },
      specs: {
        src: [ './spec/suites.coffee' ],
        dest: './build/<%= pkg.name %>.specs.js',
        options: {
          debug: true, // embed source maps
          alias: [ './src/<%= pkg.name %>.coffee:securemsg' ]
        }
      }
    },

    coffeelint: {
      src: ['src/**/*.coffee'],
      spec: ['spec/**/*.coffee'],
      options: {
        configFile: '.coffeelintrc'
      }
    },

    connect: {
      server: {},
    },

    'mocha_phantomjs': {
      all: {
        options: {
          urls: [
            'http://127.0.0.1:8000/spec/runner.html'
            ]
        }
      }
    },

    simplemocha: {
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'spec'
      },
      all: {
        src: ['node_modules/should/should.js','build/<%= pkg.name %>.require.js', 'build/<%= pkg.name %>.specs.js']
      }
    },

    uglify: {
      dist: {
        files: {
          'build/<%= pkg.name %>.min.js':
            ['<%= browserify.standalone.dest %>']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.registerTask('default', [
    'coffeelint',
    'browserify',
    'uglify',
    'simplemocha',
    'connect',
    'mocha_phantomjs' // run in the browser
  ]);

};
