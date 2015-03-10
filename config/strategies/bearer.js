'use strict';

var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var Token = require('../../app/models/token');
var User = require('../../app/models/user');
var Client = require('../../app/models/client');

module.exports = function () {
  passport.use(new BearerStrategy(
    function (accessToken, done) {
      Token.findOne({
        value: accessToken
      }, function (err, token) {
        if (err) {
          return done(err);
        }
        if (!token) {
          return done(null, false);
        }
        if (new Date() > token.expirationDate) {
          Token.delete(accessToken, function (err) {
            return done(err);
          });
          return;
        }
        if (token.userID !== null) {
          User.findOne({
            _id: token.userId
          }, function (err, user) {
            if (err) {
              return done(err);
            }
            if (!user) {
              return done(null, false);
            }
            // to keep this example simple, restricted scopes
            // are not implemented,
            // and this is just for illustrative purposes
            var info = {
              scope: '*'
            };
            return done(null, user, info);
          });
          return;
        }
        //The request came from a client only since userID is null
        //therefore the client is passed back instead of a user
        Client.findOne({
          _id: token.clientId
        }, function (err, client) {
          if (err) {
            return done(err);
          }
          if (!client) {
            return done(null, false);
          }
          // to keep this example simple, restricted scopes are not implemented,
          // and this is just for illustrative purposes
          var info = {
            scope: '*'
          };
          return done(null, client, info);
        });
      });
    }
  ));
};