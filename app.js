'use strict'
process.on('uncaughtException', function(err) {
  console.log('An uncaught exception happened.')
  console.log(err)
})

process.on('unhandledRejection', function(reason, p) {
  console.log('Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason)
})

const config = require('./config/config')
const Glue = require('glue')
const manifest = require('./manifest')
require('./config/i18n')

if (config.get('env') === 'development') {
  require('./config/setup-root')
}

const options = {
  relativeTo: __dirname,
}

Glue.compose(manifest, options, function(err, server) {
  if (err) throw err

  server.start(() => console.log('Server running at:', server.info.uri))
})
