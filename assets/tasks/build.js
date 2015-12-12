'use strict';

var Foso = require('foso');
var js = require('fosify-js');
var sass = require('fosify-sass');
var path = require('path');

module.exports = function(cb) {
  var foso = new Foso();
  foso
    .register([js, sass], {
      src: path.resolve(__dirname, '../'),
      dest: path.resolve(__dirname, '../dist'),
      ignore: [
        './dist/**'
      ]
    })
    .then(() => foso.bundle())
    .then(cb)
    .catch(cb);
};
