'use strict';

var h = require('virtual-dom/h');
var vtag = require('vtag')(h);
var publicLayout = require('./public-layout');
var t = require('i18next').t;
var config = require('../../config/config');
var messageBlock = require('./partials/message-block');
var socialSignin = require('./partials/social-signin');

module.exports = function(opts) {
  return publicLayout(opts, {
    styles: [
      vtag.css('/dist/css/signin.css')
    ],
    scripts: [
      vtag.js('/dist/js/signin.js')
    ],
    content: [
      h('h1#sign-header.ui.icon.center.aligned.header', [
        h('i.sign.in.icon'),
        h('.content', [
          t('account.signInTo', { appTitle: config.get('app.title') }),
          h('.sub.header', [
            t('account.dontHaveAccount'),
            ' | ',
            h('a', { href: '/signup' }, t('account.signUpNow'))
          ])
        ])
      ]),
      h('.signin.options.ui.two.column.middle.aligned.relaxed.fitted.stackable.grid', [
        h('.column', [
          h('h2', t('account.usingCredentials')),
          h('form.ui.form', { method: 'post'}, [
            messageBlock(opts.messages),
            h('.field',
              h('.ui.left.icon.input', [
                h('input', {
                  type: 'text',
                  placeholder: t('account.usernameOrEmail'),
                  name: 'username',
                  value: opts.username
                }),
                h('i.user.icon')
              ])
            ),
            h('.field',
              h('.ui.left.icon.input', [
                h('input', {
                  type: 'password',
                  placeholder: t('account.password.password'),
                  name: 'password',
                  value: opts.password
                }),
                h('i.lock.icon')
              ])
            ),
            h('button.fluid.ui.big.primary.submit.button',
              { type: 'submit'}, t('account.login')
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
