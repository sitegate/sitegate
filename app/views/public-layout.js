'use strict'
const h = require('virtual-dom/h')
const layout = require('./layout')
const R = require('ramda')

module.exports = (vm, partials) => {
  return layout(vm, R.merge(partials, {
    coreContent: h('.main.container', partials.content),
  }))
}
