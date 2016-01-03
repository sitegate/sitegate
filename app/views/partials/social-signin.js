'use strict';

const h = require('virtual-dom/h');
const t = require('i18next').t;
const R = require('ramda');
const config = require('../../../config/config');

function socialButton(type) {
  return h('a.fluid.ui.big.basic.button', {
    href: '/auth/' + type,
  }, [
    h('i.' + type + '.icon'),
    t('social.' + type),
  ]);
}

module.exports = function() {
  return R.values(config.get('provider'))
    .map(provider => socialButton(provider.provider));
};
