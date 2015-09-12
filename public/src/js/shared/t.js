'use strict';
var i18n = require('i18next-client');

i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  ns: {
    namespaces: ['translation'],
    defaultNs: 'translation'
  },
  resGetPath: '/locales/__lng__/__ns__.json'
});

module.exports = function(resourceName) {
  return function() {
    return i18n.t(resourceName);
  };
};
