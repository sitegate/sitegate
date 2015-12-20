'use strict';

const gulp = require('gulp');
const Foso = require('foso');
const js = require('fosify-js');
const sass = require('fosify-sass');
const path = require('path');
const fs = require('fs');
const Server = require('foso-cdn').Server;

gulp.task('develop', function(cb) {
  let foso = new Foso();

  let options = {
    src: path.resolve(__dirname, '../'),
    dest: path.resolve(__dirname, '../dist'),
    ignore: [
      './dist/**'
    ],
    watch: true,
    serve: false,
    livereload: true
  };

  foso
    .register([js, sass], options)
    .then(() => foso.bundle())
    .then(function() {
      let server = new Server({
        src: path.resolve(__dirname, '../')
      });
      return server.start();
    })
    .then(cb)
    .catch(cb);
});
