'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var less = require('gulp-less');

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
  livereload.listen();
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