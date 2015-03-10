'use strict';

var passport = require('passport');
var ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
var Client = require('../../app/models/client');

module.exports = function () {
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
};