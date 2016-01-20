'use strict'
const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')

module.exports = (server, opts) => {
  const user = server.plugins.jimboClient.user

  passport.use(new LocalStrategy(
    (username, password, done) => {
      user.authenticate({
        usernameOrEmail: username,
        password: password,
      }, done)
    }
  ))

  passport.serializeUser((user, done) => {
    done(null, {
      id: user.id,
      username: user.username,
      email: user.email,
    })
  })

  // Deserialize sessions
  passport.deserializeUser((user, done) => done(null, user))
}

module.exports.attributes = {
  name: 'local-strategy',
  dependencies: ['user'],
}
