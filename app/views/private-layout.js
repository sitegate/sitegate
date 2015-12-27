'use strict';

var h = require('virtual-dom/h');
var layout = require('./layout');
var R = require('ramda');
var t = require('i18next').t;
var config = require('../../config/config');

module.exports = function(vm, partials) {
  return layout(vm, R.merge(partials, {
    coreContent: [
      h('.ui.menu',
        h('.main.container', [
          h('a.item', { href: config.get('app.homepageUrl'), }, [
            h('i.home.icon'),
            t('menu.home')
          ]),
          h('a.item', { href: '/settings' }, [
            h('i.settings.icon'),
            t('settings.settings')
          ]),
          h('a.item', { href: '/signout'}, [
            h('i.sign.out.icon'),
            t('account.signOut')
          ])
        ])
      ),
      h('.main.container', partials.content)
    ]
  }));
};
