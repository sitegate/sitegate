'use strict'
const h = require('virtual-dom/h')
const vtag = require('vtag')(h)
const publicLayout = require('../../../views/public-layout')
const t = require('i18next').t

module.exports = function(vm) {
  return publicLayout(vm, {
    scripts: [
      vtag.js('/dist/js/password/new.js'),
    ],
    content: [
      h('h1#sign-header.ui.icon.center.aligned.header', [
        h('i.lock.icon'),
        h('.content', t('account.password.reset')),
      ]),
      h('form.ui.form', { method: 'post'}, [
        h('.field', [
          h('label', t('account.password.new')),
          h('.ui.left.icon.input', [
            h('input', {
              type: 'password',
              name: 'newPassword',
              autocomplete: 'off',
            }),
            h('i.lock.icon'),
          ]),
        ]),
        h('.field', [
          h('label', t('account.password.repeat')),
          h('.ui.left.icon.input', [
            h('input', {
              type: 'password',
              name: 'repeatPassword',
              autocomplete: 'off',
            }),
            h('i.lock.icon'),
          ]),
        ]),
        h('button.ui.blue.submit.button',
          { tye: 'submit'}, t('account.password.reset')
        ),
      ]),
    ],
  })
}
