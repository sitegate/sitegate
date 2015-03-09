'use strict';

var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var Client = require('../models/client');

passport.use('client-basic', new BasicStrategy(
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

exports.isClientAuthenticated = passport.authenticate('client-basic', { session : false });