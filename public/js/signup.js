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
          },
          {
            type: 'length[5]',
            prompt: 'A username must be at least 5 characters'
          },
          {
            type: 'maxLength[20]',
            prompt: 'A username must be less than 20 characters'
          },
          {
            type: 'username',
            prompt: 'Username can only contain latin letters, numbers, dashes, underscores and dots.'
          }
       ]
      },
      password: {
        identifier: 'password',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter a password'
         },
          {
            type: 'length[6]',
            prompt: 'Your password must be at least 6 characters'
         }
       ]
      },
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

  var $lock = $('.lock.icon');
  $('input[type="password"]').keyup(function () {
    if (!window.zxcvbn) {
      return;
    }

    var $this = $(this);
    var score = window.zxcvbn($this.val()).score;
    var scoreName;

    if (score == 4) {
      scoreName = 'strong';
    } else if (score == 3) {
      scoreName = 'good';
    } else {
      scoreName = 'weak';
    }

    $lock.toggleClass('green', scoreName == 'strong');
    $lock.toggleClass('yellow', scoreName == 'good');
    $lock.toggleClass('red', scoreName == 'weak');
  });
})();