'use strict'
exports.register = function(server, opts, next) {
  if (!opts.amqpURL)
    return next(new Error('amqpURL is required'))

  server.client({
    name: 'client',
    channel: 'sitegate-client',
    url: opts.amqpURL,
    methods: [],
  })

  next()
};

exports.register.attributes = {
  name: 'client',
};
