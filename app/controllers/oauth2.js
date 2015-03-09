'use strict';

var oauth2orize = require('oauth2orize');
var User = require('../models/user');
var Client = require('../models/client');
var Token = require('../models/token');
var Code = require('../models/code');
var uid = require('../helpers/uid');

var server = oauth2orize.createServer();

// Register serialialization function
server.serializeClient(function (client, cb) {
  return cb(null, client._id);
});

// Register deserialization function
server.deserializeClient(function (id, cb) {
  Client.findOne({
    _id: id
  }, function (err, client) {
    if (err) {
      return cb(err);
    }
    return cb(null, client);
  });
});

// Register authorization code grant type
server.grant(oauth2orize
  .grant
  .code(function (client, redirectUri, user, ares, cb) {
    // Create a new authorization code
    var code = new Code({
      value: uid(16),
      clientId: client._id,
      redirectUri: redirectUri,
      userId: user._id
    });

    // Save the auth code and check for errors
    code.save(function (err) {
      if (err) {
        return cb(err);
      }

      cb(null, code.value);
    });
  }));

// Exchange authorization codes for access tokens
server.exchange(oauth2orize
  .exchange
  .code(function (client, code, redirectUri, cb) {
    Code.findOne({
      value: code
    }, function (err, authCode) {
      if (err) {
        return cb(err);
      }
      if (authCode === undefined) {
        return cb(null, false);
      }
      if (client._id.toString() !== authCode.clientId) {
        return cb(null, false);
      }
      if (redirectUri !== authCode.redirectUri) {
        return cb(null, false);
      }

      // Delete auth code now that it has been used
      authCode.remove(function (err) {
        if (err) {
          return cb(err);
        }

        // Create a new access token
        var token = new Token({
          value: uid(256),
          clientId: authCode.clientId,
          userId: authCode.userId
        });

        // Save the access token and check for errors
        token.save(function (err) {
          if (err) {
            return cb(err);
          }

          cb(null, token);
        });
      });
    });
  }));


// User authorization endpoint
exports.authorization = [
  server.authorization(function (clientId, redirectUri, cb) {

    Client.findOne({
      id: clientId
    }, function (err, client) {
      if (err) {
        return cb(err);
      }

      return cb(null, client, redirectUri);
    });
  }),
  function (req, res) {
    res.render('dialog', {
      transactionID: req.oauth2.transactionID,
      user: req.user,
      client: req.oauth2.client
    });
  }
];

// User decision endpoint
exports.decision = [
  server.decision()
];

// Application client token exchange endpoint
exports.token = [
  server.token(),
  server.errorHandler()
];