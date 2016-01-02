'use strict';

const h = require('virtual-dom/h');
const settingsLayout = require('../../../views/settings-layout');
const t = require('i18next').t;
const vtag = require('vtag')(h);
const messageBlock = require('../../../views/partials/message-block');
const R = require('ramda');

function password(name) {
  return h('.ui.left.icon.input', [
    h('input', {
      type: 'password',
      name: name,
      autocomplete: 'off',
    }),
    h('i.lock.icon'),
  ]);
}

module.exports = function(vm) {
  return settingsLayout(vm, {
    settingsContent: h('form.ui.segment.form', {
      method: 'post',
    }, R.filter(R.compose(R.not, R.isNil), [
      messageBlock(vm.messages),
      !vm.hasPassword ? null : h('.field',
        h('label', [
          t('settings.currentPassword'),
          password('currentPassword'),
        ])
      ),
      h('.field', [
        h('label', t('account.password.new')),
        password('newPassword'),
      ]),
      h('.field', [
        h('label', t('account.password.repeat')),
        password('verifyPassword'),
      ]),
      h('button.ui.primary.submit.button', {
        type: 'submit',
      }, t('common.saveChanges')),
    ])),
  });
};
