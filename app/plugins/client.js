'use strict'
exports.register = (server, opts) => {
  if (!opts.amqpURL) throw new Error('amqpURL is required')

  return server.client({
    name: 'client',
    channel: 'sitegate-client',
    amqpURL: opts.amqpURL,
    methods: [
      'create',
      'getById',
      'getById',
      'getByPublicId',
      'query',
      'remove',
      'update',
    ],
  })
}

exports.register.attributes = {
  name: 'client',
  dependencies: ['jimbo-client'],
}
