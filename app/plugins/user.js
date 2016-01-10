'use strict'
exports.register = function(server, opts, next) {
  if (!opts.amqpURL)
    return next(new Error('amqpURL is required'))

  server.client({
    name: 'user',
    channel: 'sitegate-user',
    url: opts.amqpURL,
    methods: [
      'authenticate',
      'changePassword',
      'changePasswordUsingToken',
      'disconnectProvider',
      'getById',
      'getByUsername',
      'getTrustedClients',
      'query',
      'register',
      'requestPasswordChangeByEmail',
      'revokeAllClientsAccess',
      'revokeClientAccess',
      'saveOAuthUserProfile',
      'sendVerificationEmail',
      'trustClient',
      'trustsClient',
      'update',
      'validateResetToken',
      'verifyEmailByToken',
    ],
  })

  next()
}

exports.register.attributes = {
  name: 'user',
}
