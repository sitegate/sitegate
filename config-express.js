'use strict'
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const passport = require('passport')
const flash = require('connect-flash')

module.exports = (server, opts) => {
  // Express session storage
  let store = new RedisStore({})
  server.beforeHandler(session({
    saveUninitialized: true,
    resave: true,
    secret: opts.sessionSecret,
    store,
  }))

  // use passport session
  server.beforeHandler(passport.initialize())
  server.beforeHandler(passport.session())

  // use connect-flash for flash messages stored in session
  server.beforeHandler(flash())
}

module.exports.attributes = {
  name: 'bootstrap',
}
