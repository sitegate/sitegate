'use strict';

var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
var Client = require('../models/client');

passport.use(new BasicStrategy(
  function (username, password, cb) {
    Client.findOne({
      id: username
    }, function (err, client) {
      if (err) {
        return cb(err);
      }

      // No client found with that id or bad password
      if (!client || client.secret !== password) {
        return cb(null, false);
      }

      // Success
      return cb(null, client);
    });
  }
));

passport.use(new ClientPasswordStrategy(
  function (clientId, clientSecret, done) {
    Client.findOne({
      id: clientId
    }, function (err, client) {
      if (err) {
        return done(err);
      }
      if (!client) {
        return done(null, false);
      }
      if (client.secret != clientSecret) {
        return done(null, false);
      }
      return done(null, client);
    });
  }
));

exports.isClientAuthenticated = passport.authenticate(['basic', 'oauth2-client-password'], { session : false });