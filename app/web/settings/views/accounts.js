'use strict';

const R = require('ramda');
const h = require('virtual-dom/h');
const settingsLayout = require('../../../views/settings-layout');
const t = require('i18next').t;
const vtag = require('vtag')(h);
const config = require('../../../../config/config');

module.exports = function(vm) {
  function socialConnection(provider) {
    let connected = (vm.user.provider === provider ||
      (vm.user.additionalProvidersData &&
        vm.user.additionalProvidersData[provider]));

    if (connected) {
      return h('a.fluid.big.ui.red.button', {
        href: '/auth/' + provider + '/disconnect',
      }, [
        h('i.' + provider + '.icon'),
        'Disconnect ',
        t('social.' + provider),
      ]);
    }

    return h('a.fluid.big.ui.basic.button', {
      href: '/auth/' + provider,
    }, [
      h('i.' + provider + '.icon'),
      'Connect ',
      t('social.' + provider),
    ]);
  }

  return settingsLayout(vm, {
    settingsContent: h('.ui.segment.social.connections.container', [
      h('h1.ui.header', t('settings.addLoginUsingService')),
      R.values(config.get('provider')).map(provider => socialConnection(provider.provider)),
    ]),
  });
};
