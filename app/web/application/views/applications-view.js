'use strict';

var h = require('virtual-dom/h');
var settingsLayout = require('../../../views/settings-layout');
var t = require('i18next').t;
var vtag = require('vtag')(h);

module.exports = function(vm) {
  return settingsLayout(vm, {
    settingsContent: [
      h('.ui.tertiary.attached.segments',
        h('.ui.breadcrumb', [
          h('a.section', {
            href: '/settings/applications'
          }, t('app.apps')),
          h('i.right.chevron.icon.divider'),
          h('.active.section', vm.name)
        ])
      ),
      h('form.ui.attached.segment', [
        h('h2', vm.name),
        h('a', {
          href: vm.homepageUrl
        }, vm.homepageUrl),
        h('p', vm.description),
        h('button.ui.red.inverted.revoke.button', {
          'data-client-id': vm.id
        }, t('app.revoke'))
      ])
    ],
    scripts: vtag.js('/dist/js/settings/applications-view.js')
  });
};
