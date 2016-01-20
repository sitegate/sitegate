'use strict'
const R = require('ramda')
const passport = require('passport')

exports.register = function (server, opts) {
  let userService = server.plugins.jimboClient.user

  R.values(opts.provider).forEach(provider => {
    server.route({
      method: 'GET',
      path: '/auth/:strategy/callback',
      config: {
        auth: false,
      },
      handler (req, res, next) {
        passport.authenticate(req.params.strategy, (err, user, redirectURL) => {
          if (req.user) return res.redirect('/settings/accounts')

          if (err || !user) return res.redirect('/signin')

          req.login(user, err => {
            if (err) return res.redirect('/signin')

            return res.redirect('/')
          })
        })(req, res, next)
      },
    })
  })

  server.route({
    path: '/auth/:strategy/disconnect',
    method: 'GET',
    handler (req, res) {
      userService.disconnectProvider({
        userId: req.user.id,
        strategy: req.params.strategy,
      }, err => {
        if (err) return res.send(err)

        return res.redirect('/settings/accounts')
      })
    },
  })
}

exports.register.attributes = {
  name: 'auth',
}
