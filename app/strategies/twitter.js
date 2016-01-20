'use strict'
const TwitterStrategy = require('passport-twitter').Strategy
const passport = require('passport')

module.exports = (server, opts) => {
  const user = server.plugins.jimboClient.user

  server.route({
    method: 'GET',
    path: '/auth/twitter',
    handler: passport.authenticate('twitter'),
  })

  passport.use(new TwitterStrategy(opts,
    (req, token, tokenSecret, profile, done) => {
      // Set the provider data and include tokens
      const providerData = profile._json
      providerData.token = token
      providerData.tokenSecret = tokenSecret

      // Create the user OAuth profile
      const providerUserProfile = {
        displayName: profile.displayName,
        username: profile.username,
        provider: 'twitter',
        providerIdentifierField: 'id_str',
        providerData,
      }

      // Save the user OAuth profile
      user.saveOAuthUserProfile({
        loggedUser: req.user,
        providerUserProfile,
      }, done)
    }
  ))
}

module.exports.attributes = {
  name: 'twitter-strategy',
  dependencies: ['user'],
}
