'use strict'
const signupView = require('./views/signup')
const t = require('i18next').t

module.exports = (server, opts) => {
  server.route({
    method: 'GET',
    path: '/signup',
    config: {
      auth: false,
    },
    handler (req, res) {
      if (req.isAuthenticated()) return res.redirect(opts.homepageUrl)

      res.vtree(signupView({}))
    },
  })

  server.route({
    method: 'POST',
    path: '/signup',
    config: {
      auth: false,
    },
    handler (req, res) {
      const userService = server.plugins.jimboClient.user

      const user = req.body

      /* Add missing user fields */
      user.provider = 'local'
      user.displayName = user.firstName + ' ' + user.lastName
      user.emailVerified = false

      userService.register(user, (err, user) => {
        if (err) {
          return res.vtree(signupView({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            messages: {
              error: t('account.error.' + (err.type || 'unknown')),
            },
          }))
        }

        req.login(user, err => {
          if (err) return res.status(400).send(err)

          return res.redirect(opts.homepageUrl)
        })
      })
    },
  })
}

module.exports.attributes = {
  name: 'web/signup',
}
