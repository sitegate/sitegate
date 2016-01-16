'use strict'
const h = require('virtual-dom/h')
const vtag = require('vtag')(h)
const publicLayout = require('../../../views/public-layout')
const t = require('i18next').t
const config = require('../../../../config/config')
const messageBlock = require('../../../views/partials/message-block')
const socialSignin = require('../../../views/partials/social-signin')

module.exports = function(vm) {
  return publicLayout(vm, {
    content: [
      h('h1#sign-header.ui.icon.center.aligned.header', [
        h('i.sign.in.icon'),
        h('.content', [
          t('account.signInTo', { appTitle: config.get('app.title') }),
          h('.sub.header', [
            t('account.dontHaveAccount'),
            ' | ',
            h('a', { href: '/signup' }, t('account.signUpNow')),
          ]),
        ]),
      ]),
      h('.signin.options.ui.two.column.middle.aligned.relaxed.fitted.stackable.grid', [
        h('.column', [
          h('h2', t('account.usingCredentials')),
          h('form.ui.form', { method: 'post'}, [
            messageBlock(vm.messages),
            h('.field',
              h('.ui.left.icon.input', [
                h('input', {
                  type: 'text',
                  placeholder: t('account.usernameOrEmail'),
                  name: 'username',
                  value: vm.username,
                }),
                h('i.user.icon'),
              ])
            ),
            h('.field',
              h('.ui.left.icon.input', [
                h('input', {
                  type: 'password',
                  placeholder: t('account.password.password'),
                  name: 'password',
                  value: vm.password,
                }),
                h('i.lock.icon'),
              ])
            ),
            h('button.fluid.ui.big.primary.submit.button',
              { type: 'submit'}, t('account.login')
            ),
          ]),
          h('a.reset.link', {
            href: '/reset-password',
          }, t('account.cantAccessAccount')),
        ]),
        h('.ui.vertical.divider', t('account.or')),
        h('.center.aligned.column.social.signin.container', [
          h('h2', t('account.usingSocialAccount')),
          socialSignin(),
        ]),
      ]),
    ],
  })
}
