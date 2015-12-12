'use strict';

import t from '../shared/t';

$('.ui.form').form({
  fields: {
    currentPassword: {
      identifier: 'currentPassword',
      rules: [
        {
          type: 'empty',
          prompt: t('settings.currentPassword.required')
        }
     ]
    },
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
    verifyPassword: {
      identifier: 'verifyPassword',
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
