/* jshint browser:true, jquery:true */
'use strict';

var t = require('./shared/t');

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
