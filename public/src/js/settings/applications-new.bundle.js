/* jshint browser:true, jquery:true */

(function (_t) {
  'use strict';

  $('.ui.form')
    .form({
      name: {
        identifier: 'name',
        rules: [
          {
            type: 'empty',
            prompt: _t('app.validation.nameRequired')
          }
       ]
      },
      homepageUrl: {
        identifier: 'homepageUrl',
        rules: [
          {
            type: 'empty',
            prompt: _t('app.validation.homepageUrl.required')
          },
          {
            type: 'url',
            prompt: _t('app.validation.homepageUrl.url')
          }
       ]
      },
      authCallbackUrl: {
        identifier: 'authCallbackUrl',
        rules: [
          {
            type: 'empty',
            prompt: _t('app.validation.authCallbackUrl.required')
          },
          {
            type: 'url',
            prompt: _t('app.validation.authCallbackUrl.url')
         }
       ]
      }
    });
})(window._t);