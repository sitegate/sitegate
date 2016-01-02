'use strict';

const h = require('virtual-dom/h');
const t = require('i18next').t;

function socialButton(type) {
  return h('a.fluid.ui.big.basic.button', {
    href: '/auth/' + type,
  }, [
    h('i.' + type + '.icon'),
    t('social.' + type),
  ]);
}

module.exports = function() {
  return ['facebook', 'twitter', 'google', 'github'].map(socialButton);
};
