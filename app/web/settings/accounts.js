'use strict'
const accountsView = require('./views/accounts')

module.exports = server => {
  server.route({
    method: 'GET',
    path: '/settings/accounts',
    config: {
      loadUser: true,
    },
    handler (req, res) {
      res.vtree(accountsView({
        user: req.pre.user,
      }))
    },
  })
}

module.exports.attributes = {
  name: 'web/settings/accounts',
}
