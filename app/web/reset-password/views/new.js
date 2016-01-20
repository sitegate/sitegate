'use strict'
const h = require('virtual-dom/h')
const hh = require('hyperscript-helpers')(h)
const vtag = require('vtag')(h)
const publicLayout = require('../../../views/public-layout')
const t = require('i18next').t

const h1 = hh.h1
const i = hh.i
const div = hh.div
const form = hh.form
const label = hh.label
const input = hh.input
const button = hh.button

module.exports = vm => {
  return publicLayout(vm, {
    scripts: [
      vtag.js('/dist/js/password/new.js'),
    ],
    content: [
      h1('#sign-header.ui.icon.center.aligned.header', [
        i('.lock.icon'),
        div('.content', [t('account.password.reset')]),
      ]),
      form('.ui.form', { method: 'post'}, [
        div('.field', [
          label([t('account.password.new')]),
          div('.ui.left.icon.input', [
            input({
              type: 'password',
              name: 'newPassword',
              autocomplete: 'off',
            }),
            i('.lock.icon'),
          ]),
        ]),
        div('.field', [
          label([t('account.password.repeat')]),
          div('.ui.left.icon.input', [
            input({
              type: 'password',
              name: 'repeatPassword',
              autocomplete: 'off',
            }),
            i('.lock.icon'),
          ]),
        ]),
        button('.ui.blue.submit.button',
          { tye: 'submit'}, [t('account.password.reset')]
        ),
      ]),
    ],
  })
}
