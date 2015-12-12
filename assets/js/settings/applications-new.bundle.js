'use strict';

import t from '../shared/t';

$('.ui.form').form({
  fields: {
    name: {
      identifier: 'name',
      rules: [
        {
          type: 'empty',
          prompt: t('app.validation.nameRequired')
        }
     ]
    },
    homepageUrl: {
      identifier: 'homepageUrl',
      rules: [
        {
          type: 'empty',
          prompt: t('app.validation.homepageUrl.required')
        },
        {
          type: 'url',
          prompt: t('app.validation.homepageUrl.url')
        }
     ]
    },
    authCallbackUrl: {
      identifier: 'authCallbackUrl',
      rules: [
        {
          type: 'empty',
          prompt: t('app.validation.authCallbackUrl.required')
        },
        {
          type: 'url',
          prompt: t('app.validation.authCallbackUrl.url')
        }
     ]
    }
  }
});
