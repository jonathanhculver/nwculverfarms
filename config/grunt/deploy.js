module.exports = function(grunt) {
  var env = grunt.option('env');
  grunt.envConfig = grunt.file.readJSON('.env.json');

  grunt.config.merge({
    aws: grunt.envConfig['aws'],
    aws_s3: {
      options: {
        accessKeyId:    '<%= aws.key %>',
        secretAccessKey: '<%= aws.secret %>',
        uploadConcurrency: 20,
        downloadConcurrency: 20
      },
      production: {
        options: {
          bucket: grunt.envConfig['production']['aws']['bucket']
        },
        files: [
          {expand: true, cwd: '/public', src: ['**'], dest: '/assets'}
        ]
      },
    }
  });

  grunt.registerTask('deploy', 'Push assets to aws s3', function() {
    if(env === 'production') {
      grunt.task.run(['aws_s3:production']);
    } else {
      grunt.log.errorlns('Invalid environment specified.');
    }
  });
};
