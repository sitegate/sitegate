'use strict';

var h = require('virtual-dom/h');
var layout = require('./layout');
var R = require('ramda');

module.exports = function(vm, partials) {
  return layout(vm, R.merge(partials, {
    coreContent: h('.main.container', partials.content),
  }));
};
