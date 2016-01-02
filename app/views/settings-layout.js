'use strict';

const h = require('virtual-dom/h');
const privateLayout = require('./private-layout');
const R = require('ramda');
const t = require('i18next').t;

function link(targetUrl, text) {
  return h('a.item', {
    href: targetUrl,
  }, text);
}

module.exports = function(vm, partials) {
  return privateLayout(vm, R.merge(partials, {
    content: h('.ui.grid', [
      h('.four.wide.column',
        h('.ui.vertical.fluid.menu', [
          link('/settings/profile', t('account.account')),
          link('/settings/accounts', t('account.socialAccounts')),
          link('/settings/password', t('account.password.password')),
          link('/settings/applications', t('app.apps')),
        ])
      ),
      h('.twelve.wide.column', partials.settingsContent),
    ]),
  }));
};
