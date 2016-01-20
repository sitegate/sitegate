'use strict'
const signinView = require('./views/signin')
const joi = require('joi')

module.exports = (server, opts) => {
  if (!opts.homepageUrl) throw new Error('opts.homepageUrl is required')

  let userService = server.plugins.jimboClient.user

  server.route({
    method: 'GET',
    path: '/signin',
    config: {
      auth: false,
    },
    handler (req, res) {
      if (req.isAuthenticated()) return res.redirect(opts.homepageUrl)

      res.vtree(signinView({}))
    },
  })

  server.route({
    method: 'POST',
    path: '/signin',
    config: {
      auth: false,
      validate: {
        body: {
          username: joi.string().required(),
          password: joi.string().required(),
        },
      },
    },
    handler (req, res) {
      userService.authenticate({
        usernameOrEmail: req.body.username,
        password: req.body.password,
      }, (err, user) => {
        if (err) return res.send(err)

        req.login(user, err => {
          if (err) return res.send(err)

          if (req.query.next) {
            return res.redirect(decodeURIComponent(req.query.next))
          }

          res.redirect(opts.homepageUrl)
        })
      })
    },
  })

  server.route({
    method: ['GET', 'POST', 'DELETE'],
    path: '/signout',
    config: {
      plugins: {
        'humble-auth': {
          appendNext: false,
        },
      },
    },
    handler (req, res) {
      req.logout()
      res.redirect('/signin')
    },
  })
}

module.exports.attributes = {
  name: 'web/signin',
  dependencies: ['hexi-validate'],
}
