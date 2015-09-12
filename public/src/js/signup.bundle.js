/* jshint browser:true, jquery:true */

(function (_t) {
  'use strict';

  $('.ui.form')
    .form({
      fields: {
        username: {
          identifier: 'username',
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
        password: {
          identifier: 'password',
          rules: [
            {
              type: 'empty',
              prompt: _t('accountValidation.password.required')
            },
            {
              type: 'length[6]',
              prompt: _t('accountValidation.password.minLength')
            }
         ]
        },
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
})(window._t);
