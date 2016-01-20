'use strict'
const h = require('virtual-dom/h')
const hh = require('hyperscript-helpers')(h)
const settingsLayout = require('../../../views/settings-layout')
const t = require('i18next').t
const vtag = require('vtag')(h)

const div = hh.div
const a = hh.a
const i = hh.i
const form = hh.form
const h2 = hh.h2
const p = hh.p
const button = hh.button

module.exports = vm => {
  return settingsLayout(vm, {
    settingsContent: [
      div('.ui.tertiary.attached.segment', [
        div('.ui.breadcrumb', [
          a('.section', { href: '/settings/applications' }, [t('app.apps')]),
          i('.right.chevron.icon.divider'),
          div('.active.section', [vm.name]),
        ]),
      ]),
      form('.ui.attached.segment', [
        h2([vm.name]),
        a({ href: vm.homepageUrl }, [vm.homepageUrl]),
        p([vm.description]),
        button('.ui.red.inverted.revoke.button',
          {
            attributes: {
              'data-client-id': vm.id,
            },
          },
          [t('app.revoke')]
        ),
      ]),
    ],
    scripts: vtag.js('/dist/js/settings/applications-view.js'),
  })
}
