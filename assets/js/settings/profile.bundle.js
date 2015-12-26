'use strict';

import {tfn} from '../shared/t';
import username from '../validation/username';

$('.ui.form').form({
  fields: {
    username: {
      identifier: 'user.username',
      rules: [
        {
          type: 'empty',
          prompt: tfn('accountValidation.username.required')
        },
        {
          type: 'length[5]',
          prompt: tfn('accountValidation.username.minLength')
        },
        {
          type: 'maxLength[20]',
          prompt: tfn('accountValidation.username.maxLength')
        },
        {
          type: username.rule,
          prompt: tfn('accountValidation.username.allowedChars')
        }
     ]
    },
    email: {
      identifier: 'user.email',
      rules: [
        {
          type: 'empty',
          prompt: tfn('accountValidation.email.required')
        },
        {
          type: 'email',
          prompt: tfn('accountValidation.email.valid')
        }
     ]
    }
  }
});

$('#resend-email').click(function() {
  $.ajax({
    url: '/resend-email-verification',
    method: 'POST',
    success() {
      alert('success');
    },
    error() {
      alert('error');
    }
  });
});
