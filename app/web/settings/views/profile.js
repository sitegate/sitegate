'use strict';

var h = require('virtual-dom/h');
var settingsLayout = require('../../../views/settings-layout');
var R = require('ramda');
var t = require('i18next').t;
var vtag = require('vtag')(h);
var messageBlock = require('../../../views/partials/message-block');

function verificationButton(emailVerified) {
  if (emailVerified) {
    return h('.ui.corner.label', h('i.checkmark.icon'));
  }
  return h('#resend-email.ui.animated.fade.red.button', [
    h('.visible.content', [
      h('i.warning.circle.icon'),
      'Not verified'
    ]),
    h('.hidden.content', [
      h('i.send.icon'),
      'Resend email'
    ])
  ]);
}

module.exports = function(vm) {
  return settingsLayout(vm, {
    settingsContent: h('form.ui.segment.form', { method: 'post' }, [
      messageBlock(vm.messages),
      h('.field', [
        h('label', t('account.username')),
        h('.ui.left.icon.input', [
          h('input', {
            type: 'text',
            placeholder: t('account.username'),
            name: 'user.username',
            value: vm.user.username
          }),
          h('i.user.icon')
        ])
      ]),
      h('.field', [
        h('label', t('account.email')),
        h('.ui.left.icon.action.labeled.input', [
          h('input', {
            type: 'text',
            placeholder: t('account.email'),
            name: 'user.email',
            value: vm.user.email
          }),
          h('i.mail.icon'),
          verificationButton(vm.user.emailVerified)
        ])
      ]),
      h('button.ui.primary.submit.button', {
        type: 'submit'
      }, t('common.saveChanges'))
    ])
  });
};
