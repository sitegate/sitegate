'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../config');
var users = require('../../app/controllers/users');

module.exports = function () {
  // Use facebook strategy
  passport.use(new FacebookStrategy({
      clientID: config.get('facebook.clientID'),
      clientSecret: config.get('facebook.clientSecret'),
      callbackURL: config.get('facebook.callbackURL'),
      passReqToCallback: true
    },
    function (req, accessToken, refreshToken, profile, done) {
      // Set the provider data and include tokens
      var providerData = profile._json;
      providerData.accessToken = accessToken;
      providerData.refreshToken = refreshToken;

      // Create the user OAuth profile
      var providerUserProfile = {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        username: profile.username,
        provider: 'facebook',
        providerIdentifierField: 'id',
        providerData: providerData
      };

      // Save the user OAuth profile
      users.saveOAuthUserProfile(req, providerUserProfile, done);
    }
  ));
};
