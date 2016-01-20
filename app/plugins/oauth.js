'use strict'
exports.register = (server, opts) => {
  if (!opts.amqpURL) throw new Error('amqpURL is required')

  return server.client({
    name: 'oauth',
    channel: 'sitegate-oauth',
    amqpURL: opts.amqpURL,
    methods: [
      'authToken',
      'createCode',
      'exchange',
      'isTrusted',
    ],
  })
}

exports.register.attributes = {
  name: 'ms/oauth',
}
