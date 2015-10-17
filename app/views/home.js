'use strict';

var h = require('virtual-dom/h');
var privateLayout = require('./private-layout');
var t = require('i18next').t;

module.exports = function(opts) {
  return privateLayout(opts, {
    content: 'HOMEPAGE'
  });
};
