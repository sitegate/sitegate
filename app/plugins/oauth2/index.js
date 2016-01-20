'use strict'
const dialogView = require('./views/dialog')
const oauth2orize = require('oauth2orize')
const BasicStrategy = require('passport-http').BasicStrategy
const passport = require('passport')

module.exports = (server, opts) => {
  const oauthService = server.plugins.jimboClient.oauth
  const userService = server.plugins.jimboClient.user
  const clientService = server.plugins.jimboClient.client

  passport.use(new BasicStrategy(
    (clientPublicId, secret, cb) => {
      clientService.getByPublicId({
        publicId: clientPublicId,
      }, (err, client) => {
        if (err) return cb(err)

        // No client found with that id or bad password
        if (!client || client.secret !== secret)
          return cb(null, false)

        // Success
        return cb(null, client)
      })
    }
  ))

  let oserver = oauth2orize.createServer()

  /* Register serialialization function */
  oserver.serializeClient((client, cb) => {
    return cb(null, {
      id: client.id,
      publicId: client.publicId,
      secret: client.secret,
    })
  })

  /* Register deserialization function */
  oserver.deserializeClient((client, cb) => cb(null, client))

  /* Register authorization code grant type */
  oserver.grant(oauth2orize
    .grant
    .code((client, redirectUri, user, ares, cb) => {
      oauthService.createCode({
        clientId: client.id,
        redirectUri: redirectUri,
        userId: user.id,
      }, cb)
    }))

  /* Exchange authorization codes for access tokens */
  oserver.exchange(oauth2orize
    .exchange
    .code((client, code, redirectUri, cb) => {
      oauthService.exchange({
        clientId: client.id,
        code: code,
        redirectUri: redirectUri,
      }, cb)
    }))

  // User authorization endpoint
  server.route({
    method: 'GET',
    path: '/oauth2/authorize',
    handler: [
      oserver.authorization((clientId, redirectUri, cb) => {
        clientService.getByPublicId({ publicId: clientId }, (err, client) => {
          if (err) return cb(err)

          return cb(null, client, redirectUri)
        })
      }),
      (req, res, next) => {
        oauthService.isTrusted({
          clientId: req.oauth2.client.id,
          userId: req.user.id,
        }, function (err, isTrusted) {
          if (err) {
            console.log(err)
            return
          }

          if (isTrusted) {
            server.decision(
              { loadTransaction: false },
              (req, cb) => cb(null, { allow: true })
            )(req, res, next)
            return
          }

          return res.vtree(dialogView({
            transactionID: req.oauth2.transactionID,
            user: req.auth.credentials,
            client: req.oauth2.client,
          }))
        })
      },
    ],
  })

  // User decision endpoint
  server.route({
    method: 'POST',
    path: '/oauth2/authorize',
    handler: [
      (req, res, next) => {
        userService.trustClient({
          userId: req.user.id,
          clientId: req.body.clientId,
        }, next)
      },
      oserver.decision(),
    ],
  })

  // Application client token exchange endpoint
  server.route({
    method: 'POST',
    path: '/oauth2/token',
    config: {
      auth: false,
    },
    handler: [
      passport.authenticate([
        'basic',
        'oauth2-client-password',
      ], { session: false }),
      oserver.token(),
    ],
  })
}

module.exports.attributes = {
  name: 'plugins/oauth2',
  dependencies: [
    'ms/oauth',
    'user',
    'client',
  ],
}
