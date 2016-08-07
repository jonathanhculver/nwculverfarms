module.exports = function(grunt) {

  var jsFiles = [
    'client/scripts/*.js'
  ];

  var sassFiles = [
    'client/styles/*.scss'
  ];

  grunt.initConfig({
    jsFiles: jsFiles,
    sassFiles: sassFiles
  });
};
