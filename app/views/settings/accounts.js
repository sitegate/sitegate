'use strict';

var h = require('virtual-dom/h');
var settingsLayout = require('../settings-layout');
var t = require('i18next').t;
var vtag = require('vtag')(h);

module.exports = function(vm) {
  function socialConnection(provider, iconClass) {
    var connected = (vm.user.provider === provider ||
      (vm.user.additionalProvidersData &&
        vm.user.additionalProvidersData[provider]));

    if (connected) {
      return h('a.fluid.big.ui.red.button', {
        href: '/auth/' + provider + '/disconnect'
      }, [
        h('i.' + iconClass + '.icon'),
        'Disconnect ',
        t('social.' + provider)
      ]);
    } else {
      return h('a.fluid.big.ui.black.basic.button', {
        href: '/auth/' + provider
      }, [
        h('i.' + iconClass + '.icon'),
        'Connect ',
        t('social.' + provider)
      ]);
    }
  }

  return settingsLayout(vm, {
    settingsContent: h('.ui.segment.social.connections.container', [
      h('h1.ui.header', t('settings.addLoginUsingService')),
      socialConnection('facebook', 'facebook'),
      socialConnection('twitter', 'twitter'),
      socialConnection('google', 'google plus')
    ])
  });
};
