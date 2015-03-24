/* jshint node:true */
'use strict';

/**
 * Module dependencies.
 */
var User = require('../clients/user');
var passport = require('passport');

/**
 * OAuth callback
 */
exports.oauthCallback = function (strategy) {
  return function (req, res, next) {
    passport.authenticate(strategy, function (err, user, redirectURL) {
      if (req.user) {
        return res.redirect('/settings/accounts');
      }
      if (err || !user) {
        return res.redirect('/signin');
      }
      req.login(user, function (err) {
        if (err) {
          return res.redirect('/signin');
        }

        return require('../go-callback')(req, res, next);
      });
    })(req, res, next);
  };
};

exports.disconnect = function (strategy) {
  return function (req, res, next) {
    User.disconnectProvider({
      userId: req.user.id,
      strategy: strategy
    }, function (err) {
      if (err) {
        return next(err);
      }

      return res.redirect('/settings/accounts');
    });
  };
};

/**
 * Helper function to save or update a OAuth user profile
 */
exports.saveOAuthUserProfile = function (req, providerUserProfile, done) {
  User.saveOAuthUserProfile({
    loggedUser: req.user,
    providerUserProfile: providerUserProfile
  }, done);
};