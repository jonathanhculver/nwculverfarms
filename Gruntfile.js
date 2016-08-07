module.exports = function(grunt) {

  // Load dependencies
  require('./config/grunt/config.js')(grunt);
  require('./config/grunt/deploy.js')(grunt);

  // Project configuration.
  grunt.config.merge({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: {
        src: [ 'build' ]
      }
    },

    uglify: {
      build: {
        src: grunt.config('jsFiles'),
        dest: 'public/<%= pkg.name %>.min.js'
      }
    },

    concat: {
      dist: {
        src: grunt.config('sassFiles'),
        dest: 'build/<%= pkg.name %>.scss'
      }
    },

    sass: {
      dist: {
        src: 'build/<%= pkg.name %>.scss',
        dest: 'build/<%= pkg.name %>.css'
      }
    },

    autoprefixer: {
      build: {
        expand: true,
        cwd: 'build',
        src: [ '*.css' ],
        dest: 'build'
      }
    },

    cssmin: {
      build: {
        files: {
          'build/<%= pkg.name %>.min.css': [ 'build/<%= pkg.name %>.css' ]
        }
      }
    },

    copy: {
      build: {
        cwd: 'build',
        src: [ '<%= pkg.name %>.min.css'],
        dest: 'public',
        expand: true
      },
    },

    watch: {
      styles: {
        files: 'client/styles/*.scss',
        tasks: [ 'styles' ]
      },
      scripts: {
        files: 'client/scripts/*.js',
        tasks: [ 'scripts' ]
      }
    }
  });

  //load modules
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-aws-s3');

  //tasks
  grunt.registerTask(
    'scripts',
    'Compiles the JavaScript files.',
    ['uglify']
  );

  grunt.registerTask(
    'styles',
    'Compiles the stylesheets.',
    ['concat', 'sass', 'autoprefixer', 'cssmin', 'copy']
  );

  grunt.registerTask(
    'build',
    'Compiles all of the assets and copies the files to the public directory.',
    ['styles', 'scripts', 'clean']
  );

  grunt.registerTask(
    'default',
    'Watches the project for changes, automatically builds them and runs a server.',
    ['build', 'watch']
  );

};
