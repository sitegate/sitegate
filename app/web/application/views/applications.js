'use strict'
const h = require('virtual-dom/h')
const hh = require('hyperscript-helpers')(h)
const settingsLayout = require('../../../views/settings-layout')
const t = require('i18next').t

const h5 = hh.h5
const a = hh.a
const div = hh.div
const i = hh.i
const button = hh.button

module.exports = vm => {
  const hasTrustedClients =
    !!(vm.trustedClients && vm.trustedClients.length > 0)
  return settingsLayout(vm, {
    settingsContent: [
      h5('.ui.top.attached.block.header.clearing.segment', [
        t('app.devApps'),
        a('.ui.basic.small.right.floated.button',
          {
            href: '/settings/applications/new',
          },
          [t('app.registerNew')]
        ),
      ]),
      div('.ui.attached.segment', [
        !vm.clients || vm.clients.length === 0
          ? t('app.noApps')
          : div('.ui.list', [
              vm.clients.map(client =>
                a('.item',
                  {
                    href: '/settings/applications/' + client.id,
                  },
                  [
                    i('.anchor.icon'),
                    client.name,
                  ]
                )
              ),
            ]),
      ]),
      h5('.ui.top.attached.block.header', [
        t('app.authorizedApps'),
        vm.hasTrustedClients ?
          button('.ui.basic.small.revoke-all.button', t('app.revokeAll')) :
          '',
      ]),
      div('.ui.attached.segment',
        !hasTrustedClients ? t('app.noTrustedApps') :
        div('.ui.list.trusted.clients',
          vm.trustedClients.map(client => {
            return div('.item', [
              div('.ui.right.floated.tiny.buttons', [
                a('.ui.tiny.button', {
                  href: '/settings/connections/' + client.id,
                }, [t('app.view')]),
                button('.ui.tiny.red.inverted.revoke.button', {
                  attributes: {
                    'data-client-id': client.id.toString(),
                  },
                }, [t('app.revoke')]),
              ]),
              i('.anchor.icon'),
              div('.content.aligned', [client.name]),
            ])
          })
        )
      ),
    ],
  })
}
