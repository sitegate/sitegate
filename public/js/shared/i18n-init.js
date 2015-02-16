/* jshint browser:true, jquery:true */

(function () {
  'use strict';

  $.i18n.init({
    lng: 'en',
    ns: {
      namespaces: ['translation'],
      defaultNs: 'translation'
    }
  });

  window._t = function (resourceName) {
    return function () {
      return $.t(resourceName);
    };
  };
})();