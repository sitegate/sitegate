'use strict';

import t from './shared/t';
import zxcvbn from 'zxcvbn';
import username from './validation/username';

$('.ui.form').form({
  fields: {
    username: {
      identifier: 'username',
      rules: [
        {
          type: 'empty',
          prompt: t('accountValidation.username.required')
        },
        {
          type: 'length[5]',
          prompt: t('accountValidation.username.minLength')
        },
        {
          type: 'maxLength[20]',
          prompt: t('accountValidation.username.maxLength')
        },
        {
          type: username.rule,
          prompt: t('accountValidation.username.allowedChars')
        }
     ]
    },
    password: {
      identifier: 'password',
      rules: [
        {
          type: 'empty',
          prompt: t('accountValidation.password.required')
        },
        {
          type: 'length[6]',
          prompt: t('accountValidation.password.minLength')
        }
     ]
    },
    email: {
      identifier: 'email',
      rules: [
        {
          type: 'empty',
          prompt: t('accountValidation.email.required')
        },
        {
          type: 'email',
          prompt: t('accountValidation.email.valid')
        }
     ]
    }
  }
});

let $lock = $('.lock.icon');
$('input[type="password"]').keyup(function() {
  let $this = $(this);
  let score = zxcvbn($this.val()).score;
  let scoreName;

  if (score === 4) {
    scoreName = 'strong';
  } else if (score === 3) {
    scoreName = 'good';
  } else {
    scoreName = 'weak';
  }

  $lock.toggleClass('green', scoreName === 'strong');
  $lock.toggleClass('yellow', scoreName === 'good');
  $lock.toggleClass('red', scoreName === 'weak');
});
