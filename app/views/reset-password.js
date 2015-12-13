'use strict';

var h = require('virtual-dom/h');
var vtag = require('vtag')(h);
var publicLayout = require('./public-layout');
var t = require('i18next').t;
var config = require('../../config/config');
var messageBlock = require('./partials/message-block');
var socialSignin = require('./partials/social-signin');

module.exports = function(vm) {
  return publicLayout(vm, {
    content: [
      h('h1#sign-header.ui.icon.center.aligned.header', [
        h('i.lock.icon'),
        h('.content', t('account.password.reset'))
      ]),
      h('form.ui.form', { method: 'post'}, [
        messageBlock(vm.messages),
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
        h('button.fluid.ui.big.primary.submit.button',
          { type: 'submit'}, t('account.password.reset')
        ),
        h('.ui.divider'),
        h('a', { href: '/signin'}, t('account.signIn')),
        '  ',
        t('account.or').toLocaleLowerCase(),
        '  ',
        h('a', { href: '/signup'}, t('account.signUp'))
      ])
    ]
  });
};
