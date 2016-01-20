'use strict'
const h = require('virtual-dom/h')
const hh = require('hyperscript-helpers')(h)
const settingsLayout = require('../../../views/settings-layout')
const t = require('i18next').t
const messageBlock = require('../../../views/partials/message-block')
const R = require('ramda')

const div = hh.div
const label = hh.label
const button = hh.button
const form = hh.form
const input = hh.input
const i = hh.i

function password (name) {
  return div('.ui.left.icon.input', [
    input({
      type: 'password',
      name: name,
      autocomplete: 'off',
    }),
    i('.lock.icon'),
  ])
}

module.exports = vm => {
  return settingsLayout(vm, {
    settingsContent: [
      form('.ui.segment.form', {
        method: 'post',
      }, R.filter(R.compose(R.not, R.isNil), [
        messageBlock(vm.messages),
        !vm.hasPassword ? null : div('.field',
          label([
            t('settings.currentPassword'),
            password('currentPassword'),
          ])
        ),
        div('.field', [
          label([t('account.password.new')]),
          password('newPassword'),
        ]),
        div('.field', [
          label([t('account.password.repeat')]),
          password('verifyPassword'),
        ]),
        button('.ui.primary.submit.button', {
          type: 'submit',
        }, [t('common.saveChanges')]),
      ])),
    ],
  })
}
