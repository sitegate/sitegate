'use strict';

var Foso = require('foso');
var js = require('fosify-js');
var sass = require('fosify-sass');
var path = require('path');
var fs = require('fs');
var Server = require('../../../../foso/cdn').Server;

module.exports = function(cb) {
  var foso = new Foso();

  var options = {
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
      var server = new Server({
        src: path.resolve(__dirname, '../')
      });
      return server.start();
    })
    .then(cb)
    .catch(cb);
};
