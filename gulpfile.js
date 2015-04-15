'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var less = require('gulp-less');
var fs = require('fs');

gulp.task('less', function () {
  gulp.src('./public/css/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./public/dest/css'))
    .pipe(livereload());
});

gulp.task('watch', function () {
  gulp.watch('./public/css/**/*.less', ['less']);
});

gulp.task('develop', function () {
  var options = {
    key: fs.readFileSync(__dirname + '/certs/privatekey.pem'),
    cert: fs.readFileSync(__dirname + '/certs/certificate.pem')
  };
  livereload.listen(options);
  nodemon({
    script: 'app.js',
    ext: 'js jade',
  }).on('restart', function () {
    setTimeout(function () {
      livereload.changed();
    }, 500);
  });
});

gulp.task('default', [
  'less',
  'develop',
  'watch'
]);