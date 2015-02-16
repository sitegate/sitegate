/* jshint browser:true, jquery:true */

(function () {
  'use strict';

  $('.ui.form')
    .form({
      email: {
        identifier: 'email',
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