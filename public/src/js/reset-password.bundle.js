/* jshint browser:true, jquery:true */
'use strict';

var t = require('./shared/t');

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
