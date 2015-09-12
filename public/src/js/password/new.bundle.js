/* jshint browser:true, jquery:true */

(function (_t) {
  'use strict';

  $('.ui.form')
    .form({
      fields: {
        newPassword: {
          identifier: 'newPassword',
          rules: [
            {
              type: 'empty',
              prompt: _t('settings.newPassword.required')
            },
            {
              type: 'length[6]',
              prompt: _t('settings.newPassword.minLength')
            }
         ]
        },
        repeatPassword: {
          identifier: 'repeatPassword',
          rules: [
            {
              type: 'empty',
              prompt: _t('settings.verifyPassword.required')
            },
            {
              type: 'match[newPassword]',
              prompt: _t('settings.verifyPassword.matchNewPassword')
           }
         ]
        }
      }
    });
})(window._t);
