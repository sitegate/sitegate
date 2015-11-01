'use strict';

var h = require('virtual-dom/h');
var settingsLayout = require('../settings-layout');
var t = require('i18next').t;
var vtag = require('vtag')(h);
var messageBlock = require('../partials/message-block');

module.exports = function(vm) {
  return settingsLayout(vm, {
    settingsContent: [
      h('.ui.tertiary.attached.segment',
        h('.ui.breadcrumb', [
          h('a.section', {
            href: '/settings/applications'
          }, t('app.apps')),
          h('i.right.chevron.icon.divider'),
          h('.active.section', vm.name)
        ])
      ),
      h('.ui.attached.segment',
        h('dl', [
          h('dt', 'Client ID'),
          h('dd', vm.publicId),
          h('dt', 'Client Secret'),
          h('dd', vm.secret)
        ])
      ),
      h('form.ui.attached.segment.form', {
        method: 'post'
      }, [
        messageBlock(vm.messages),
        h('.field', [
          h('label', {
            'for': 'appName'
          }, t('app.name')),
          h('input#appName', {
            type: 'text',
            name: 'name',
            value: vm.name
          })
        ]),
        h('.field', [
          h('label', {
            'for': 'appHomepageUrl'
          }, t('app.homepageUrl')),
          h('input#appHomepageUrl', {
            type: 'text',
            name: 'homepageUrl',
            value: vm.homepageUrl
          })
        ]),
        h('.field', [
          h('label', {
            'for': 'appDescription'
          }, t('app.description')),
          h('textarea#appDescription', {
            type: 'text',
            name: 'description'
          }, vm.description)
        ]),
        h('.field', [
          h('label', {
            'for': 'appAuthCallbackUrl'
          }, t('app.authCallbackUrl')),
          h('input#appAuthCallbackUrl', {
            type: 'text',
            name: 'authCallbackUrl',
            value: vm.authCallbackUrl
          })
        ]),
        h('button.ui.primary.button', t('app.update')),
        h('button#appDelete.ui.red.basic.button', {
          type: 'button',
          attributes: {
            'data-client-id': vm.id
          }
        }, t('app.delete'))
      ])
    ],
    scripts: [
      vtag.js('/dist/js/settings/applications-new.js'),
      vtag.js('/dist/js/settings/applications-edit.js')
    ]
  });
};
