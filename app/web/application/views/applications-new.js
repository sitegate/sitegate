'use strict'
const h = require('virtual-dom/h')
const hh = require('hyperscript-helpers')(h)
const settingsLayout = require('../../../views/settings-layout')
const t = require('i18next').t
const messageBlock = require('../../../views/partials/message-block')

const form = hh.form
const label = hh.label
const div = hh.div
const input = hh.input
const textarea = hh.textarea
const button = hh.button

module.exports = vm => {
  return settingsLayout(vm, {
    settingsContent: [
      form('.ui.segment.form', { method: 'post' }, [
        messageBlock(vm.messages),

        div('.field', [
          label({ attributes: { for: 'appName' } }, [t('app.name')]),
          input('#appName', {
            type: 'text',
            name: 'name',
          }),
        ]),

        div('.field', [
          label({ attributes: { for: 'appHomepageUrl' } },
            [t('app.homepageUrl')]
          ),
          input('#appHomepageUrl', {
            type: 'text',
            name: 'homepageUrl',
          }),
        ]),

        div('.field', [
          label({ attributes: { for: 'appDescription' } },
            [t('app.description')]
          ),
          textarea('#appDescription', {
            type: 'text',
            name: 'description',
          }),
        ]),

        div('.field', [
          label({ attributes: { for: 'appAuthCallbackUrl' } },
            [t('app.authCallbackUrl')]
          ),
          input('#appAuthCallbackUrl', {
            type: 'text',
            name: 'authCallbackUrl',
          }),
        ]),

        button('.ui.primary.button', [t('app.register')]),
      ]),
    ],
  })
}
