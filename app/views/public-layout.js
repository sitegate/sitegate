'use strict';

var h = require('virtual-dom/h');
var layout = require('./layout');
var R = require('ramda');

module.exports = function(opts, partials) {
  return layout(opts, R.merge(partials, {
    coreContent: h('.main.container', partials.content),
  }));
};
