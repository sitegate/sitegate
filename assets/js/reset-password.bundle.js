'use strict';

import t from './shared/t';

$('.ui.form').form({
  fields: {
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
