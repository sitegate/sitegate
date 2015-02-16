/* jshint browser:true, jquery:true */

(function () {
  'use strict';

  $('.ui.form')
    .form({
      currentPassword: {
        identifier: 'currentPassword',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter your current password'
          }
       ]
      },
      newPassword: {
        identifier: 'newPassword',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter your new password'
          },
          {
            type: 'length[7]',
            prompt: 'Your new password must be at least 6 characters'
          }
       ]
      },
      verifyPassword: {
        identifier: 'verifyPassword',
        rules: [
          {
            type: 'empty',
            prompt: 'Please verify your new password'
          },
          {
            type: 'match[newPassword]',
            prompt: 'Does not match new password'
         }
       ]
      }
    });
})();