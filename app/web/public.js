'use strict'
const path = require('path')
const express = require('express')

module.exports = (plugin, options) => {
  plugin.express.use(
    '/',
    express.static(path.resolve(__dirname, '../../public'))
  )
}

module.exports.attributes = {
  name: 'public',
  dependencies: ['hexi-default'],
}
