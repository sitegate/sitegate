'use strict';

const h = require('virtual-dom/h');
const vtag = require('vtag')(h);
const publicLayout = require('../../../views/public-layout');
const t = require('i18next').t;

module.exports = function(vm) {
  return publicLayout(vm, {
    content: [
      h('.ui.attached.segment', [
        h('p', [
          'Hi ',
          vm.user.username,
        ]),
        h('p', [
          h('b', vm.client.name),
          ' is requesting ',
          h('b', 'full access'),
          ' to your account',
        ]),
        h('p', 'Do you approve?'),
      ]),
      h('.ui.attached.segment',
        h('form', {
          action: '/oauth2/authorize',
          method: 'post',
        }, [
          h('input', {
            name: 'transaction_id',
            type: 'hidden',
            value: vm.transactionID,
          }),
          h('input', {
            name: 'clientId',
            type: 'hidden',
            value: vm.client.id,
          }),
          h('div', [
            h('input#allow.ui.primary.button', {
              type: 'submit',
              value: 'Allow',
            }),
            h('input#deny.ui.negative.button', {
              type: 'submit',
              value: 'Deny',
              name: 'cancel',
            }),
          ]),
        ])
      ),
    ],
  });
};
