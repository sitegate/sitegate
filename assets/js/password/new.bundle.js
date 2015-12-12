'use strict';

import t from '../shared/t';

$('.ui.form').form({
  fields: {
    newPassword: {
      identifier: 'newPassword',
      rules: [
        {
          type: 'empty',
          prompt: t('settings.newPassword.required')
        },
        {
          type: 'length[6]',
          prompt: t('settings.newPassword.minLength')
        }
     ]
    },
    repeatPassword: {
      identifier: 'repeatPassword',
      rules: [
        {
          type: 'empty',
          prompt: t('settings.verifyPassword.required')
        },
        {
          type: 'match[newPassword]',
          prompt: t('settings.verifyPassword.matchNewPassword')
        }
     ]
    }
  }
});
