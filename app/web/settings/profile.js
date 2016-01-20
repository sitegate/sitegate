'use strict'
const profileView = require('./views/profile')
const errorHandler = require('../../error-handler')
const Boom = require('boom')
const joi = require('joi')

module.exports = (server, options) => {
  const userService = server.plugins.jimboClient.user

  server.route({
    method: 'GET',
    path: '/settings',
    handler (req, res) {
      res.redirect('/settings/profile')
    },
  })

  server.route({
    method: 'GET',
    path: '/settings/profile',
    config: {
      loadUser: true,
    },
    handler (req, res) {
      res.vtree(profileView({
        user: req.pre.user,
        messages: {
          success: req.flash('profileSuccessMessages'),
        },
      }))
    },
  })

  server.route({
    method: 'POST',
    path: '/settings/profile',
    config: {
      validate: {
        body: {
          username: joi.string().required(),
          email: joi.string().required(),
        },
      },
    },
    handler (req, res) {
      userService
        .update({
          id: req.user.id,
          username: req.body.username,
          email: req.body.email,
        })
        .then(data => {
          return res.vtree(profileView({
            user: req.body,
            messages: {
              success: 'Profile was updated' + (data.emailHasBeenUpdated ?
                'Verification email was sent' : ''),
            },
          }))
        })
        .catch(err => {
          return res.vtree(profileView({
            user: req.body,
            messages: {
              error: errorHandler.getErrorMessage(err),
            },
          }))
        })
    },
  })

  server.route({
    method: 'POST',
    path: '/resend-email-verification',
    handler (req, res) {
      userService.sendVerificationEmail({ userId: req.user.id })
        .then(() => res.send({
          message: 'Verification has been sent out',
        }))
        .catch(err => res.send(Boom.wrap(err)))
    },
  })
}

module.exports.attributes = {
  name: 'web/settings/profile',
}
