'use strict';

var oauth2orize = require('oauth2orize');
var uid = require('../helpers/uid');
var User = require('../clients/user');
var Client = require('../clients/client');
var OAuth = require('../clients/oauth');

var server = oauth2orize.createServer();

// Register serialialization function
server.serializeClient(function (client, cb) {
  return cb(null, {
    id: client.id,
    publicId: client.publicId,
    secret: client.secret
  });
});

// Register deserialization function
server.deserializeClient(function (client, cb) {
  return cb(null, client);
});

// Register authorization code grant type
server.grant(oauth2orize
  .grant
  .code(function (client, redirectUri, user, ares, cb) {
    OAuth.createCode({
      clientId: client.id,
      redirectUri: redirectUri,
      userId: user.id
    }, cb);
  }));

// Exchange authorization codes for access tokens
server.exchange(oauth2orize
  .exchange
  .code(function (client, code, redirectUri, cb) {
    OAuth.exchange({
      clientId: client.id,
      code: code,
      redirectUri: redirectUri
    }, cb);
  }));


// User authorization endpoint
exports.authorization = [
  server.authorization(function (clientId, redirectUri, cb) {
    
    Client.getByPublicId(clientId, function (err, client) {
      if (err) {
        return cb(err);
      }

      return cb(null, client, redirectUri);
    });
  }),
  function (req, res, next) {
    OAuth.isTrusted({
      clientId: req.oauth2.client.id,
      userId: req.user.id
    }, function (err, isTrusted) {
      if (err) {
        //
      }

      if (isTrusted) {
        server.decision({
          loadTransaction: false
        }, function (req, cb) {
          cb(null, {
            allow: true
          });
        })(req, res, next);
        return;
      }
      res.render('dialog', {
        transactionID: req.oauth2.transactionID,
        user: req.user,
        client: req.oauth2.client
      });
    });
  }
];

// User decision endpoint
exports.decision = [
  function (req, res, next) {
    User.trustClient({
      userId: req.user.id,
      clientId: req.body.clientId
    }, next);
  },
  server.decision()
];

// Application client token exchange endpoint
exports.token = [
  server.token(),
  server.errorHandler()
];