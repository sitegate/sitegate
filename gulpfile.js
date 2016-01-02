'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const livereload = require('gulp-livereload');
const hub = require('gulp-hub');

gulp.task('develop', function() {
  process.env.NODE_ENV = 'development';
  process.env.LR_PORT = '7171';

  livereload.listen({
    port: process.env.LR_PORT,
  });

  nodemon({
    script: 'app.js',
    ext: 'js jade',
    ignore: [
      '**/node_modules/**',
      'assets/*',
    ],
  }).on('restart', function() {
    setTimeout(() => livereload.changed('app.js'), 500);
  });
});

gulp.task('default', [
  'develop',
]);

hub(['assets/gulpfile.js', 'gulpfile.js']);
