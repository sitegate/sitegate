'use strict'
const h = require('virtual-dom/h')
const privateLayout = require('../../../views/private-layout')
const t = require('i18next').t

module.exports = function(opts) {
  return privateLayout(opts, {
    content: 'HOMEPAGE',
  })
}
