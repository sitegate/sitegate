/* jshint browser:true, jquery:true */

(function (_t) {
  'use strict';

  $('.ui.form')
    .form({
      username: {
        identifier: 'username',
        rules: [
          {
            type: 'empty',
            prompt: _t('accountValidation.username.required')
          }
       ]
      },
      password: {
        identifier: 'password',
        rules: [
          {
            type: 'empty',
            prompt: _t('accountValidation.password.required')
          }
       ]
      }
    });
})(window._t);