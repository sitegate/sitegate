'use strict';

const uid = require('../../helpers/uid');
const dialogView = require('./views/dialog');

module.exports = function(server, opts, next) {
  let oauth2orize = server.plugins['humble-oauth2orize'];
  let oauthService = server.plugins['ms/oauth'];
  let userService = server.plugins.user;
  let clientService = server.plugins.client;

  server.auth.strategy('bearer', 'bearer-access-token', {
    allowQueryToken: false,
    allowMultipleHeaders: false,
    accessTokenName: 'Bearer',
    validateFunc: function(token, cb) {
      oauthService.authToken(token, function(err, userOrClient, info) {
        if (err) return cb(null, false, { token: token });

        cb(null, true, userOrClient);
      });
    }
  });

  function authenticateClient(clientPublicId, secret, cb) {
    clientService.getByPublicId(clientPublicId, function(err, client) {
      if (err) return cb(err);

      // No client found with that id or bad password
      if (!client || client.secret !== secret) {
        return cb(null, false);
      }

      // Success
      return cb(null, true, client);
    });
  }

  server.auth.strategy('basic-client', 'basic', {
    validateFunc: function(request, clientPublicId, secret, cb) {
      authenticateClient(clientPublicId, secret, cb);
    }
  });

  server.auth.strategy('form-client', 'form', {
    usernameField: 'client_id',
    passwordField: 'client_secret',
    validateFunc: authenticateClient,
  });

  /* Register serialialization function */
  oauth2orize.serializeClient(function(client, cb) {
    return cb(null, {
      id: client.id,
      publicId: client.publicId,
      secret: client.secret
    });
  });

  /* Register deserialization function */
  oauth2orize.deserializeClient((client, cb) => cb(null, client));

  /* Register authorization code grant type */
  oauth2orize.grant(oauth2orize
    .grants
    .code(function(client, redirectUri, user, ares, cb) {
      oauthService.createCode({
        clientId: client.id,
        redirectUri: redirectUri,
        userId: user.id
      }, cb);
    }));

  /* Exchange authorization codes for access tokens */
  oauth2orize.exchange(oauth2orize
    .exchanges
    .code(function(client, code, redirectUri, cb) {
      oauthService.exchange({
        clientId: client.id,
        code: code,
        redirectUri: redirectUri
      }, cb);
    }));

  /* User authorization endpoint */
  server.route({
    method: 'GET',
    path: '/oauth2/authorize',
    config: {
      auth: 'default',
    },
    handler: function(req, reply) {
      let userId = req.auth.credentials.id;
      oauth2orize.authorize(req, reply, function(xreq, xres) {
        oauthService.isTrusted({
          clientId: xreq.oauth2.client.id,
          userId: userId
        }, function(err, isTrusted) {
          if (err) {
            console.log(err);
            return;
          }

          if (isTrusted) {
            req.oauth2 = xreq.oauth2;
            req.payload = req.payload || {};
            oauth2orize.decision(req, reply, {
              loadTransaction: false
            }, function(req, cb) {
              cb(null, {
                allow: true
              });
            });
            return;
          }
          return reply.vtree(dialogView({
            transactionID: xreq.oauth2.transactionID,
            user: req.auth.credentials,
            client: xreq.oauth2.client
          }));
        });
      }, function(clientId, redirectUri, cb) {
        clientService.getByPublicId(clientId, function(err, client) {
          if (err) return cb(err);
          return cb(null, client, redirectUri);
        });
      });
    }
  });

  /* User decision endpoint */
  server.route({
    method: 'POST',
    path: '/oauth2/authorize',
    config: {
      auth: 'default',
    },
    handler: function(req, reply) {
      let userService = req.server.plugins.user;

      userService.trustClient({
        userId: req.auth.credentials.id,
        clientId: req.payload.clientId
      }, function() {
        oauth2orize.decision(req, reply);
      });
    }
  });

  /* Application client token exchange endpoint */
  server.route({
    method: 'POST',
    path: '/oauth2/token',
    config: {
      auth: {
        strategies: [
          'basic-client',
          'form-client',
        ]
      },
    },
    handler: function(req, reply) {
      oauth2orize.token(req, reply);
    },
  });

  next();
};

module.exports.attributes = {
  name: 'plugins/oauth2',
  dependencies: [
    'ms/oauth',
    'user',
    'client',
  ]
};
