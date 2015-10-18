'use strict';

var h = require('virtual-dom/h');
var settingsLayout = require('../settings-layout');
var t = require('i18next').t;
var vtag = require('vtag')(h);
var messageBlock = require('../partials/message-block');
var R = require('ramda');

function password(name) {
  return h('.ui.left.icon.input', [
    h('input', {
      type: 'password',
      name: name,
      autocomplete: 'off'
    }),
    h('i.lock.icon')
  ]);
}

module.exports = function(vm) {
  return settingsLayout(vm, {
    settingsContent: h('form.ui.segment.form', {
      method: 'post'
    }, R.filter(R.compose(R.not, R.isNil), [
      messageBlock(vm.messages),
      !vm.hasPassword ? null : h('.field',
        h('label', [
          t('settings.currentPassword'),
          password('currentPassword')
        ])
      ),
      h('.field', [
        h('label', t('account.password.new')),
        password('newPassword')
      ]),
      h('.field', [
        h('label', t('account.password.repeat')),
        password('verifyPassword')
      ]),
      h('button.ui.primary.submit.button', {
        type: 'submit'
      }, t('common.saveChanges'))
    ])),
    scripts: vtag.js('/dist/js/settings/password.js')
  });
};
