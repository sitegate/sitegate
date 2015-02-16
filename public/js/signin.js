/* jshint browser:true, jquery:true */

(function () {
  'use strict';

  $('.ui.form')
    .form({
      username: {
        identifier: 'username',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter a username'
          }
       ]
      },
      password: {
        identifier: 'password',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter a password'
          }
       ]
      }
    });
})();