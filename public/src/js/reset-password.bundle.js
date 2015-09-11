/* jshint browser:true, jquery:true */

(function (_t) {
  'use strict';

  $('.ui.form')
    .form({
      email: {
        identifier: 'email',
        rules: [
          {
            type: 'empty',
            prompt: _t('accountValidation.email.required')
          },
          {
            type: 'email',
            prompt: _t('accountValidation.email.valid')
         }
       ]
      }
    });
})(window._t);