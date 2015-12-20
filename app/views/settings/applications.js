'use strict';

var h = require('virtual-dom/h');
var settingsLayout = require('../settings-layout');
var t = require('i18next').t;
var vtag = require('vtag')(h);

module.exports = function(vm) {
  var hasTrustedClients = !!(vm.trustedClients && vm.trustedClients.length > 0);
  return settingsLayout(vm, {
    settingsContent: [
      h('h5.ui.top.attached.block.header', [
        t('app.devApps'),
        h('a.ui.basic.small.button', {
          href: '/settings/applications/new'
        }, t('app.registerNew'))
      ]),
      h('.ui.attached.segment',
        !vm.clients || vm.clients.length === 0 ?
        t('app.noApps') :
        h('.ui.list', vm.clients.map(function(client) {
          return h('a.item', {
            href: '/settings/applications/' + client.id
          }, [
            h('i.anchor.icon'),
            client.name
          ]);
        }))
      ),
      h('h5.ui.top.attached.block.header', [
        t('app.authorizedApps'),
        vm.hasTrustedClients ?
          h('button.ui.basic.small.revoke-all.button', t('app.revokeAll')) :
          ''
      ]),
      h('.ui.attached.segment',
        !hasTrustedClients ? t('app.noTrustedApps') :
        h('.ui.list.trusted.clients',
          vm.trustedClients.map(function(client) {
            return h('.item', [
              h('.ui.right.floated.tiny.buttons', [
                h('a.ui.tiny.button', {
                  href: '/settings/connections/' + client.id
                }, t('app.view')),
                h('button.ui.tiny.red.inverted.revoke.button', {
                  'data-client-id': client.id.toString()
                }, t('app.revoke'))
              ]),
              h('i.anchor.icon'),
              h('.content.aligned', client.name)
            ]);
          })
        )
      )
    ]
  });
};
