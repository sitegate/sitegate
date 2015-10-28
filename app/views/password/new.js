'use strict';

var h = require('virtual-dom/h');
var vtag = require('vtag')(h);
var publicLayout = require('../public-layout');
var t = require('i18next').t;

module.exports = function(vm) {
  return publicLayout(vm, {
    scripts: [
      vtag.js('/dist/js/password/new.js')
    ],
    content: [
      h('h1#sign-header.ui.icon.center.aligned.header', [
        h('i.lock.icon'),
        h('.content', t('account.password.reset'))
      ]),
      h('form.ui.form', { method: 'post'}, [
        h('.field', [
          h('label', t('account.password.new')),
          h('.ui.left.icon.input', [
            h('input', {
              type: 'password',
              name: 'newPassword',
              autocomplete: 'off'
            }),
            h('i.lock.icon')
          ])
        ]),
        h('.field', [
          h('label', t('account.password.repeat')),
          h('.ui.left.icon.input', [
            h('input', {
              type: 'password',
              name: 'repeatPassword',
              autocomplete: 'off'
            }),
            h('i.lock.icon')
          ])
        ]),
        h('button.ui.blue.submit.button',
          { type: 'submit'}, t('account.password.reset')
        )
      ])
    ]
  });
};
