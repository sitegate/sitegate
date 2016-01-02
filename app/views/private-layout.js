'use strict';

const h = require('virtual-dom/h');
const layout = require('./layout');
const R = require('ramda');
const t = require('i18next').t;
const config = require('../../config/config');

module.exports = function(vm, partials) {
  return layout(vm, R.merge(partials, {
    coreContent: [
      h('.ui.menu',
        h('.main.container', [
          h('a.item', { href: config.get('app.homepageUrl'), }, [
            h('i.home.icon'),
            t('menu.home'),
          ]),
          h('a.item', { href: '/settings' }, [
            h('i.settings.icon'),
            t('settings.settings'),
          ]),
          h('a.item', { href: '/signout'}, [
            h('i.sign.out.icon'),
            t('account.signOut'),
          ]),
        ])
      ),
      h('.main.container', partials.content),
    ],
  }));
};
