'use strict';

var gulp = require('gulp');

gulp.task('default', ['build']);

gulp.task('build', require('./tasks/build'));

gulp.task('develop', require('./tasks/develop'));
