'use strict';

var h = require('virtual-dom/h');
var privateLayout = require('./private-layout');
var R = require('ramda');
var t = require('i18next').t;

function link(targetUrl, text) {
  return h('a.item', {
    href: targetUrl
  }, text);
}

module.exports = function(opts, partials) {
  return privateLayout(opts, R.merge(partials, {
    content: h('.ui.grid', [
      h('.four.wide.column',
        h('.ui.vertical.fluid.menu', [
          link('/settings/profile', t('account.account')),
          link('/settings/accounts', t('account.socialAccounts')),
          link('/settings/password', t('account.password.password')),
          link('/settings/applications', t('app.apps'))
        ])
      ),
      h('.twelve.wide.column', partials.settingsContent)
    ])
  }));
};
