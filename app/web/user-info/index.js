'use strict'
const BearerStrategy = require('passport-http-bearer').Strategy
const passport = require('passport')

module.exports = (server, opts, next) => {
  let oauthService = server.plugins.jimboClient.oauth

  passport.use(new BearerStrategy((token, done) => {
    oauthService.authToken({ token }, done)
  }))

  server.route({
    method: 'GET',
    path: '/api/userinfo',
    config: {
      auth: false,
    },
    task: 'auth-bearer',
    handler: [
      passport.authenticate('bearer', { session: false }),
      (req, res) => {
        res.json({
          id: req.user.id,
          username: req.user.username,
          email: req.user.email,
        })
      },
    ],
  })

  next()
}

module.exports.attributes = {
  name: 'web/user-info',
}
