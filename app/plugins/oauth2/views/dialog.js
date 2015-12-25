'use strict';

var h = require('virtual-dom/h');
var vtag = require('vtag')(h);
var publicLayout = require('../../../views/public-layout');
var t = require('i18next').t;
var config = require('../../../../config/config');

module.exports = function(vm) {
  return publicLayout(vm, {
    content: [
      h('.ui.attached.segment', [
        h('p', [
          'Hi ',
          vm.user.username
        ]),
        h('p', [
          h('b', vm.client.name),
          ' is requesting ',
          h('b', 'full access'),
          ' to your account'
        ]),
        h('p', 'Do you approve?')
      ]),
      h('.ui.attached.segment',
        h('form', {
          action: '/oauth2/authorize',
          method: 'post'
        }, [
          h('input', {
            name: 'transaction_id',
            type: 'hidden',
            value: vm.transactionID
          }),
          h('input', {
            name: 'clientId',
            type: 'hidden',
            value: vm.client.id
          }),
          h('div', [
            h('input#allow.ui.primary.button', {
              type: 'submit',
              value: 'Allow'
            }),
            h('input#deny.ui.negative.button', {
              type: 'submit',
              value: 'Deny',
              name: 'cancel'
            })
          ])
        ])
      )
    ]
  });
};
