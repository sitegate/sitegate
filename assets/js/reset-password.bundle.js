'use strict'
import {tfn} from './shared/t'

$('.ui.form').form({
  fields: {
    email: {
      identifier: 'email',
      rules: [
        {
          type: 'empty',
          prompt: tfn('accountValidation.email.required'),
        },
        {
          type: 'email',
          prompt: tfn('accountValidation.email.valid'),
        },
      ],
    },
  },
})
