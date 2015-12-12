'use strict';

var Foso = require('foso');
var js = require('fosify-js');
var sass = require('fosify-sass');
var path = require('path');
var fs = require('fs');

module.exports = function(cb) {
  var foso = new Foso();

  var options = {
    src: path.resolve(__dirname, '../'),
    dest: path.resolve(__dirname, '../dist'),
    ignore: [
      './dist/**'
    ],
    watch: true,
    serve: true,
    livereload: {
      key: fs.readFileSync(path.resolve(__dirname, '../../certs/privatekey.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, '../../certs/certificate.pem'))
    }
  };

  foso
    .register([js, sass], options)
    .then(() => foso.bundle())
    .then(cb)
    .catch(cb);
};
