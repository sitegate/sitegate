'use strict';

var h = require('virtual-dom/h');
var vtag = require('vtag')(h);
var publicLayout = require('../../../views/public-layout');
var t = require('i18next').t;
var config = require('../../../../config/config');
var messageBlock = require('../../../views/partials/message-block');
var socialSignin = require('../../../views/partials/social-signin');

module.exports = function(vm) {
  return publicLayout(vm, {
    content: [
      h('h1#sign-header.ui.icon.center.aligned.header', [
        h('i.sign.in.icon'),
        h('.content', [
          t('account.signUpTo', { appTitle: config.get('app.title') }),
          h('.sub.header', [
            t('account.alreadyHaveAccount'),
            ' | ',
            h('a', { href: '/signin' }, t('account.signInNow'))
          ])
        ])
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
                  placeholder: t('account.username'),
                  name: 'username',
                  value: vm.username
                }),
                h('i.user.icon')
              ])
            ),
            h('.field',
              h('.ui.left.icon.input', [
                h('input', {
                  type: 'text',
                  placeholder: t('account.email'),
                  name: 'email',
                  value: vm.email
                }),
                h('i.mail.icon')
              ])
            ),
            h('.field',
              h('.ui.left.icon.input', [
                h('input', {
                  type: 'password',
                  placeholder: t('account.password.password'),
                  name: 'password',
                  value: vm.password
                }),
                h('i.lock.icon')
              ])
            ),
            h('button.fluid.ui.big.primary.submit.button',
              { type: 'submit'}, t('account.createAccount')
            )
          ])
        ]),
        h('.ui.vertical.divider', t('account.or')),
        h('.center.aligned.column.social.signin.container', [
          h('h2', t('account.usingSocialAccount')),
          socialSignin()
        ])
      ])
    ]
  });
};
