'use strict'
const FacebookStrategy = require('passport-facebook').Strategy
const passport = require('passport')

module.exports = (server, opts) => {
  const user = server.plugins.jimboClient.user

  server.route({
    method: 'GET',
    path: '/auth/facebook',
    handler: passport.authenticate('facebook', {
      scope: ['email'],
    }),
  })

  passport.use(new FacebookStrategy(opts,
    (req, accessToken, refreshToken, profile, done) => {
      // Set the provider data and include tokens
      const providerData = profile._json
      providerData.accessToken = accessToken
      providerData.refreshToken = refreshToken

      // Create the user OAuth profile
      const providerUserProfile = {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        username: profile.username,
        provider: 'facebook',
        providerIdentifierField: 'id',
        providerData: providerData,
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
  name: 'facebook-strategy',
  dependencies: ['user'],
}
