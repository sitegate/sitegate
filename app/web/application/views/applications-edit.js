'use strict'
const h = require('virtual-dom/h')
const hh = require('hyperscript-helpers')(h)
const settingsLayout = require('../../../views/settings-layout')
const t = require('i18next').t
const vtag = require('vtag')(h)
const messageBlock = require('../../../views/partials/message-block')

const div = hh.div
const a = hh.a
const i = hh.i
const dl = hh.dl
const dt = hh.dt
const dd = hh.dd
const form = hh.form
const label = hh.label
const input = hh.input
const textarea = hh.textarea
const button = hh.button

module.exports = vm => {
  return settingsLayout(vm, {
    settingsContent: [
      div('.ui.tertiary.attached.segment', [
        div('.ui.breadcrumb', [
          a('.section', {href: '/settings/applications'}, [t('app.apps')]),
          i('.right.chevron.icon.divider'),
          div('.active.section', vm.name),
        ]),
      ]),
      div('.ui.attached.segment', [
        dl([
          dt(['Client ID']),
          dd([vm.publicId]),
          dt(['Client Secret']),
          dd([vm.secret]),
        ]),
      ]),
      form('.ui.attached.segment.form', { method: 'post' }, [
        messageBlock(vm.messages),
        div('.field', [
          label({ attributes: { for: 'appName' } }, [t('app.name')]),
          input('#appName', {
            type: 'text',
            name: 'name',
            value: vm.name,
          }),
        ]),
        div('.field', [
          label({ attributes: { for: 'appHomepageUrl' } },
            [t('app.homepageUrl')]
          ),
          input('#appHomepageUrl', {
            type: 'text',
            name: 'homepageUrl',
            value: vm.homepageUrl,
          }),
        ]),
        div('.field', [
          label({ attributes: { for: 'appDescription' } },
            [t('app.description')]
          ),
          textarea('#appDescription', {
            type: 'text',
            name: 'description',
          }, [vm.description]),
        ]),
        div('.field', [
          label({ attributes: { for: 'appAuthCallbackUrl' } },
            [t('app.authCallbackUrl')]
          ),
          input('#appAuthCallbackUrl', {
            type: 'text',
            name: 'authCallbackUrl',
            value: vm.authCallbackUrl,
          }),
        ]),
        button('.ui.primary.button', [t('app.update')]),
        button('#appDelete.ui.red.basic.button', {
          type: 'button',
          attributes: {
            'data-client-id': vm.id,
          },
        }, [t('app.delete')]),
      ]),
    ],
    scripts: [
      vtag.js('/dist/js/settings/applications-new.js'),
      vtag.js('/dist/js/settings/applications-edit.js'),
    ],
  })
}
