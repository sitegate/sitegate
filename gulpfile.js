'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var fs = require('fs');

gulp.task('develop-assets', require('./assets/tasks/develop'));

gulp.task('develop', ['develop-assets'], function() {
  process.env.NODE_ENV = 'development';

  var options = {
    port: '7171',
    key: fs.readFileSync(__dirname + '/certs/privatekey.pem'),
    cert: fs.readFileSync(__dirname + '/certs/certificate.pem')
  };
  livereload.listen(options);

  nodemon({
    script: 'app.js',
    ext: 'js jade',
    ignore: [
      '**/node_modules/**',
      'assets/*'
    ]
  }).on('restart', function() {
    setTimeout(() => livereload.changed('app.js'), 500);
  });
});

gulp.task('default', [
  'develop'
]);
