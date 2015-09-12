/* jshint browser:true, jquery:true */

(function (_t) {
  'use strict';

  $('.ui.form')
    .form({
      fields: {
        currentPassword: {
          identifier: 'currentPassword',
          rules: [
            {
              type: 'empty',
              prompt: _t('settings.currentPassword.required')
            }
         ]
        },
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
        verifyPassword: {
          identifier: 'verifyPassword',
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
