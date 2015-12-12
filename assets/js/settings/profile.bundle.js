'use strict';

import t from '../shared/t';
import username from '../validation/username';

$('.ui.form').form({
  fields: {
    username: {
      identifier: 'user.username',
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
    email: {
      identifier: 'user.email',
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

$('#resend-email').click(function() {
  $.ajax({
    url: '/resend-email-verification',
    method: 'POST',
    success: function() {
      alert('success');
    },
    error: function() {
      alert('error');
    }
  });
});
