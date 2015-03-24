'use strict';

var passport = require('passport');
var ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
var Client = require('../../app/clients/client');

module.exports = function () {
  passport.use(new ClientPasswordStrategy(
    function (clientPublicId, clientSecret, done) {
      Client.getByPublicId({
        publicId: clientPublicId
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