'use strict'
const homepageView = require('./views/home')

module.exports = (plugin, options) => {
  plugin.route({
    method: 'GET',
    path: '/',
    handler (req, res) {
      res.vtree(homepageView({}))
    },
  })
}

module.exports.attributes = {
  name: 'web/home',
}
