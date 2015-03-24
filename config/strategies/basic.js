'use strict';

var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var Client = require('../../app/clients/client');

module.exports = function () {
  passport.use(new BasicStrategy(
    function (clientPublicId, secret, cb) {
      Client.getByPublicId({
        publicId: clientPublicId
      }, function (err, client) {
        if (err) {
          return cb(err);
        }

        // No client found with that id or bad password
        if (!client || client.secret !== secret) {
          return cb(null, false);
        }

        // Success
        return cb(null, client);
      });
    }
  ));
};