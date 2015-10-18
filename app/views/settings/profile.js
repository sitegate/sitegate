'use strict';

var h = require('virtual-dom/h');
var settingsLayout = require('../settings-layout');
var R = require('ramda');
var t = require('i18next').t;
var vtag = require('vtag')(h);
var messageBlock = require('../partials/message-block');

module.exports = function(opts) {
  return settingsLayout(opts, {
    settingsContent: h('form.ui.segment.form', { method: 'post' }, [
      messageBlock(opts.messages),
      h('.field', [
        h('label', t('account.username')),
        h('.ui.left.icon.input', [
          h('input', {
            type: 'text',
            placeholder: t('account.username'),
            name: 'user.username',
            value: opts.user.username
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
            value: opts.user.email
          }),
          h('i.mail.icon'),
          !opts.user.emailVerified ?
            h('#resend-email.ui.animated.fade.red.button', [
              h('.visible.content', [
                h('i.warning.circle.icon'),
                'Not verified'
              ]),
              h('.hidden.content', [
                h('i.send.icon'),
                'Resend email'
              ])
            ]) :
            h('.ui.corner.label', h('i.checkmark.icon'))
        ])
      ]),
      h('button.ui.primary.submit.button', {
        type: 'submit'
      }, t('common.saveChanges'))
    ]),
    scripts: vtag.js('/dist/js/settings/profile.js')
  });
};
