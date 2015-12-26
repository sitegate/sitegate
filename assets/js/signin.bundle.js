'use strict';

import {tfn} from './shared/t';

$('.ui.form').form({
  fields: {
    username: {
      identifier: 'username',
      rules: [
        {
          type: 'empty',
          prompt: tfn('accountValidation.usernameOrEmail.required')
        }
     ]
    },
    password: {
      identifier: 'password',
      rules: [
        {
          type: 'empty',
          prompt: tfn('accountValidation.password.required')
        }
     ]
    }
  }
});
