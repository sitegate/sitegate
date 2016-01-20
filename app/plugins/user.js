'use strict'
exports.register = (server, opts) => {
  if (!opts.amqpURL) throw new Error('amqpURL is required')

  return server.client({
    name: 'user',
    channel: 'sitegate-user',
    amqpURL: opts.amqpURL,
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
}

exports.register.attributes = {
  name: 'user',
}
