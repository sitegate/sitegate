'use strict';

import {tfn} from '../shared/t';

$('.ui.form').form({
  fields: {
    name: {
      identifier: 'name',
      rules: [
        {
          type: 'empty',
          prompt: tfn('app.validation.nameRequired')
        }
     ]
    },
    homepageUrl: {
      identifier: 'homepageUrl',
      rules: [
        {
          type: 'empty',
          prompt: tfn('app.validation.homepageUrl.required')
        },
        {
          type: 'url',
          prompt: tfn('app.validation.homepageUrl.url')
        }
     ]
    },
    authCallbackUrl: {
      identifier: 'authCallbackUrl',
      rules: [
        {
          type: 'empty',
          prompt: tfn('app.validation.authCallbackUrl.required')
        },
        {
          type: 'url',
          prompt: tfn('app.validation.authCallbackUrl.url')
        }
     ]
    }
  }
});
