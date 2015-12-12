'use strict';

import t from './shared/t';

$('.ui.form').form({
  fields: {
    username: {
      identifier: 'username',
      rules: [
        {
          type: 'empty',
          prompt: t('accountValidation.usernameOrEmail.required')
        }
     ]
    },
    password: {
      identifier: 'password',
      rules: [
        {
          type: 'empty',
          prompt: t('accountValidation.password.required')
        }
     ]
    }
  }
});
