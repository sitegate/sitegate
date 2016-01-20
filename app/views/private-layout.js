'use strict'
const h = require('virtual-dom/h')
const hh = require('hyperscript-helpers')(h)
const layout = require('./layout')
const R = require('ramda')
const t = require('i18next').t
const config = require('../../config/config')

const div = hh.div
const a = hh.a
const i = hh.i

module.exports = (vm, partials) => {
  return layout(vm, R.merge(partials, {
    coreContent: [
      div('.ui.menu',
        div('.main.container', [
          a('.item', { href: config.get('app.homepageUrl'), }, [
            i('.home.icon'),
            t('menu.home'),
          ]),
          a('.item', { href: '/settings' }, [
            i('.settings.icon'),
            t('settings.settings'),
          ]),
          a('.item', { href: '/signout'}, [
            i('.sign.out.icon'),
            t('account.signOut'),
          ]),
        ])
      ),
      div('.main.container', partials.content),
    ],
  }))
}
