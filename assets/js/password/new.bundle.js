'use strict';

import {tfn} from '../shared/t';

$('.ui.form').form({
  fields: {
    newPassword: {
      identifier: 'newPassword',
      rules: [
        {
          type: 'empty',
          prompt: tfn('settings.newPassword.required'),
        },
        {
          type: 'length[6]',
          prompt: tfn('settings.newPassword.minLength'),
        },
     ],
    },
    repeatPassword: {
      identifier: 'repeatPassword',
      rules: [
        {
          type: 'empty',
          prompt: tfn('settings.verifyPassword.required'),
        },
        {
          type: 'match[newPassword]',
          prompt: tfn('settings.verifyPassword.matchNewPassword'),
        },
      ],
    },
  },
});
