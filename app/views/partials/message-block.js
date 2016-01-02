'use strict';

const h = require('virtual-dom/h');

module.exports = function(messages) {
  let result = [];
  if (messages && messages.success && messages.success.length) {
    result.push(h('.ui.positive.message', [
      h('i.ui.info.circle.icon'),
      messages.success,
    ]));
  }
  if (messages && messages.error && messages.error.length) {
    result.push(h('.ui.negative.message', [
      h('i.ui.warning.circle.icon'),
      messages.error,
    ]));
  }
  return result;
};
