'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var fs = require('fs');

gulp.task('sass', function () {
  gulp.src(__dirname + '/public/css/**/*.sass')
    .pipe(sass({
      errLogToConsole: true,
      indentedSyntax: true
    }))
    .pipe(gulp.dest(__dirname + '/public/dest/css'))
    .pipe(livereload());
});

gulp.task('watch', function () {
  gulp.watch(__dirname + '/public/css/**/*.sass', ['sass']);
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
  'sass',
  'develop',
  'watch'
]);