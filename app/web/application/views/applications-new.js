'use strict';

var h = require('virtual-dom/h');
var settingsLayout = require('../../../views/settings-layout');
var t = require('i18next').t;
var vtag = require('vtag')(h);
var messageBlock = require('../../../views/partials/message-block');

module.exports = function(vm) {
  return settingsLayout(vm, {
    settingsContent: h('form.ui.segment.form', {
      method: 'post'
    }, [
      messageBlock(vm.messages),
      h('.field', [
        h('label', {
          'for': 'appName'
        }, t('app.name')),
        h('input#appName', {
          type: 'text',
          name: 'name'
        })
      ]),
      h('.field', [
        h('label', {
          'for': 'appHomepageUrl'
        }, t('app.homepageUrl')),
        h('input#appHomepageUrl', {
          type: 'text',
          name: 'homepageUrl'
        })
      ]),
      h('.field', [
        h('label', {
          'for': 'appDescription'
        }, t('app.description')),
        h('textarea#appDescription', {
          type: 'text',
          name: 'description'
        })
      ]),
      h('.field', [
        h('label', {
          'for': 'appAuthCallbackUrl'
        }, t('app.authCallbackUrl')),
        h('input#appAuthCallbackUrl', {
          type: 'text',
          name: 'authCallbackUrl'
        })
      ]),
      h('button.ui.primary.button', t('app.register'))
    ])
  });
};
