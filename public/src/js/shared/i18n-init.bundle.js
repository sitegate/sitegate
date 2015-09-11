/* jshint browser:true, jquery:true */

(function () {
  'use strict';

  $.i18n.init({
    lng: 'en',
    fallbackLng: 'en',
    ns: {
      namespaces: ['translation'],
      defaultNs: 'translation'
    },
    resGetPath: '/locales/__lng__/__ns__.json'
  });

  window._t = function (resourceName) {
    return function () {
      return $.t(resourceName);
    };
  };
})();