'use strict'
const gulp = require('gulp')
const Foso = require('foso')
const js = require('fosify-js')
const sass = require('fosify-sass')
const path = require('path')

gulp.task('build', (cb) => {
  const foso = new Foso()
  foso
    .register([js, sass], {
      src: path.resolve(__dirname, '../'),
      dest: path.resolve(__dirname, '../dist'),
      ignore: [
        './dist/**',
      ],
    })
    .then(() => foso.bundle())
    .then(cb)
    .catch(cb)
})
