'use strict'
const ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy
const passport = require('passport')

module.exports = (server, opts) => {
  let client = server.plugins.jimboClient.client

  passport.use(new ClientPasswordStrategy(
    (clientPublicId, clientSecret, done) => {
      client.getByPublicId({
        publicId: clientPublicId,
      }, (err, client) => {
        if (err) return done(err)

        if (!client) return done(null, false)

        if (client.secret !== clientSecret) return done(null, false)

        return done(null, client)
      })
    }
  ))
}

module.exports.attributes = {
  name: 'client-password-strategy',
  dependencies: ['client'],
}
