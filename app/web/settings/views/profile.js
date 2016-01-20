'use strict'
const h = require('virtual-dom/h')
const hh = require('hyperscript-helpers')(h)
const settingsLayout = require('../../../views/settings-layout')
const t = require('i18next').t
const messageBlock = require('../../../views/partials/message-block')

const div = hh.div
const i = hh.i
const form = hh.form
const label = hh.label
const input = hh.input
const button = hh.button

function verificationButton (emailVerified) {
  if (emailVerified) {
    return div('.ui.corner.label', [i('.checkmark.icon')])
  }
  return div('#resend-email.ui.animated.fade.red.button', [
    div('.visible.content', [
      i('.warning.circle.icon'),
      'Not verified',
    ]),
    div('.hidden.content', [
      i('i.send.icon'),
      'Resend email',
    ]),
  ])
}

module.exports = vm => {
  return settingsLayout(vm, {
    settingsContent: form('.ui.segment.form', { method: 'post' }, [
      messageBlock(vm.messages),
      div('.field', [
        label([t('account.username')]),
        div('.ui.left.icon.input', [
          input({
            type: 'text',
            placeholder: t('account.username'),
            name: 'username',
            value: vm.user.username,
          }),
          i('.user.icon'),
        ]),
      ]),
      div('.field', [
        label([t('account.email')]),
        div('.ui.left.icon.action.labeled.input', [
          input({
            type: 'text',
            placeholder: t('account.email'),
            name: 'email',
            value: vm.user.email,
          }),
          i('.mail.icon'),
          verificationButton(vm.user.emailVerified),
        ]),
      ]),
      button('.ui.primary.submit.button', {
        type: 'submit',
      }, [t('common.saveChanges')]),
    ]),
  })
}
