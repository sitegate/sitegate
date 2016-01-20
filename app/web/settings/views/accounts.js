'use strict'
const R = require('ramda')
const h = require('virtual-dom/h')
const hh = require('hyperscript-helpers')(h)
const settingsLayout = require('../../../views/settings-layout')
const t = require('i18next').t
const config = require('../../../../config/config')

const div = hh.div
const a = hh.a
const i = hh.i
const h1 = hh.h1

module.exports = vm => {
  function socialConnection (provider) {
    let connected = (vm.user.provider === provider ||
      (vm.user.additionalProvidersData &&
        vm.user.additionalProvidersData[provider]))

    if (connected) {
      return a('.fluid.big.ui.red.button', {
        href: '/auth/' + provider + '/disconnect',
      }, [
        i('.' + provider + '.icon'),
        'Disconnect ',
        t('social.' + provider),
      ])
    }

    return a('.fluid.big.ui.basic.button', { href: '/auth/' + provider }, [
      i('.' + provider + '.icon'),
      'Connect ',
      t('social.' + provider),
    ])
  }

  return settingsLayout(vm, {
    settingsContent: [
      div('.ui.segment.social.connections.container', [
        h1('.ui.header', [t('settings.addLoginUsingService')]),
        R.values(config.get('provider')).map(provider => socialConnection(provider.provider)),
      ]),
    ],
  })
}
