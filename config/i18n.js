'use strict';

var i18n = require('i18next');
var path = require('path');

// Registering i18n
i18n.init({
  fallbackLng: 'en',
  ignoreRoutes: ['images/', 'public/', 'css/', 'js/'],
  debug: true,
  resGetPath: path.resolve(__dirname, '..') + '/locales/__lng__/__ns__.json'
});
