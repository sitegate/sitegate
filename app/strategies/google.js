'use strict'
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const passport = require('passport')

module.exports = (server, opts) => {
  const user = server.plugins.jimboClient.user

  server.route({
    method: 'GET',
    path: '/auth/google',
    handler: passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
    }),
  })

  passport.use(new GoogleStrategy(opts,
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
        provider: 'google',
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
  name: 'google-strategy',
  dependencies: ['user'],
}
