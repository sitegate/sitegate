/* jshint browser:true, jquery:true */

(function (_t) {
  'use strict';

  $('.ui.form')
    .form({
      username: {
        identifier: 'user.username',
        rules: [
          {
            type: 'empty',
            prompt: _t('accountValidation.username.required')
          },
          {
            type: 'length[5]',
            prompt: _t('accountValidation.username.minLength')
          },
          {
            type: 'maxLength[20]',
            prompt: _t('accountValidation.username.maxLength')
          },
          {
            type: 'username',
            prompt: _t('accountValidation.username.allowedChars')
          }
       ]
      },
      email: {
        identifier: 'user.email',
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