/* jshint browser:true, jquery:true */

(function () {
  'use strict';

  $('.ui.form')
    .form({
      username: {
        identifier: 'user.username',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter a username'
         }
       ]
      },
      email: {
        identifier: 'user.email',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter an email'
         },
          {
            type: 'email',
            prompt: 'Please enter a valid email'
         }
       ]
      }
    });
})();