'use strict';

import i18n from 'i18next-client';

i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  ns: {
    namespaces: ['translation'],
    defaultNs: 'translation'
  },
  resGetPath: '/locales/__lng__/__ns__.json'
});

export default function(resourceName) {
  return () => i18n.t(resourceName);
}
