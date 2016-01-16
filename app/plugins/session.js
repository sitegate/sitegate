'use strict'
exports.register = function(server, opts, next) {
  if (!opts.amqpURL)
    return next(new Error('amqpURL is required'))

  server.client({
    name: 'session',
    channel: 'sitegate-session',
    url: opts.amqpURL,
    methods: [
      'destroy',
      'destroyByUserId',
      'get',
      'set',
    ],
  })

  let sessionService = server.plugins['jimbo-client'].session
  server.expose({
    set: (sid, session, cb) => {
      sessionService.set({
        sid,
        session,
      }, cb)
    },
    get: (sid, cb) => {
      sessionService.get({sid}, cb)
    },
  })

  next()
}

exports.register.attributes = {
  name: 'session',
}
