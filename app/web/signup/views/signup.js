'use strict'
const h = require('virtual-dom/h')
const hh = require('hyperscript-helpers')(h)
const publicLayout = require('../../../views/public-layout')
const t = require('i18next').t
const config = require('../../../../config/config')
const messageBlock = require('../../../views/partials/message-block')
const socialSignin = require('../../../views/partials/social-signin')

const h1 = hh.h1
const h2 = hh.h2
const i = hh.i
const a = hh.a
const div = hh.div
const form = hh.form
const input = hh.input
const button = hh.button

module.exports = vm => {
  return publicLayout(vm, {
    content: [
      h1('#sign-header.ui.icon.center.aligned.header', [
        i('.sign.in.icon'),
        div('.content', [
          t('account.signUpTo', { appTitle: config.get('app.title') }),
          div('.sub.header', [
            t('account.alreadyHaveAccount'),
            ' | ',
            a({ href: '/signin' }, [t('account.signInNow')]),
          ]),
        ]),
      ]),
      div('.signin.options.ui.two.column.middle.aligned.relaxed.fitted.stackable.grid', [
        div('.column', [
          h2([t('account.usingCredentials')]),
          form('.ui.form', { method: 'post'}, [
            messageBlock(vm.messages),
            div('.field',
              div('.ui.left.icon.input', [
                input({
                  type: 'text',
                  placeholder: t('account.username'),
                  name: 'username',
                  value: vm.username,
                }),
                i('.user.icon'),
              ])
            ),
            div('.field',
              div('.ui.left.icon.input', [
                input({
                  type: 'text',
                  placeholder: t('account.email'),
                  name: 'email',
                  value: vm.email,
                }),
                i('.mail.icon'),
              ])
            ),
            div('.field',
              div('.ui.left.icon.input', [
                input({
                  type: 'password',
                  placeholder: t('account.password.password'),
                  name: 'password',
                  value: vm.password,
                }),
                i('.lock.icon'),
              ])
            ),
            button('.fluid.ui.big.primary.submit.button',
              { type: 'submit'}, t('account.createAccount')
            ),
          ]),
        ]),
        div('.ui.vertical.divider', t('account.or')),
        div('.center.aligned.column.social.signin.container', [
          h2([t('account.usingSocialAccount')]),
          socialSignin(),
        ]),
      ]),
    ],
  })
}
