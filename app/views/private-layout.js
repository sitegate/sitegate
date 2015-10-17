'use strict';

var h = require('virtual-dom/h');
var layout = require('./layout');
var R = require('ramda');
var t = require('i18next').t;

module.exports = function(opts, partials) {
  return layout(opts, R.merge(partials, {
    coreContent: [
      h('.ui.menu',
        h('.main.container', [
          h('a.item', { href: opts.homepageUrl }, [
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
