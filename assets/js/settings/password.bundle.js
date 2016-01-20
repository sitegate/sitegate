'use strict'
import { tfn } from '../shared/t'

$('.ui.form').form({
  fields: {
    currentPassword: {
      identifier: 'currentPassword',
      rules: [
        {
          type: 'empty',
          prompt: tfn('settings.currentPassword.required'),
        },
      ],
    },
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
    verifyPassword: {
      identifier: 'verifyPassword',
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
})
