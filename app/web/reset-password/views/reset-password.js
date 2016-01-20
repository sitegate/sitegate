'use strict'
const h = require('virtual-dom/h')
const hh = require('hyperscript-helpers')(h)
const publicLayout = require('../../../views/public-layout')
const t = require('i18next').t
const messageBlock = require('../../../views/partials/message-block')

const div = hh.div
const i = hh.i
const h1 = hh.h1
const input = hh.input
const button = hh.button
const a = hh.a
const form = hh.form

module.exports = vm => {
  return publicLayout(vm, {
    content: [
      h1('#sign-header.ui.icon.center.aligned.header', [
        i('.lock.icon'),
        div('.content', [t('account.password.reset')]),
      ]),
      form('.ui.form', { method: 'post'}, [
        messageBlock(vm.messages),
        div('.field', [
          div('.ui.left.icon.input', [
            input({
              type: 'text',
              placeholder: t('account.email'),
              name: 'email',
              value: vm.email,
            }),
            i('.mail.icon'),
          ]),
        ]),
        button('.fluid.ui.big.primary.submit.button',
          { type: 'submit'}, [t('account.password.reset')]
        ),
        div('.ui.divider'),
        a({ href: '/signin'}, [t('account.signIn')]),
        '  ',
        t('account.or').toLocaleLowerCase(),
        '  ',
        a({ href: '/signup'}, [t('account.signUp')]),
      ]),
    ],
  })
}
