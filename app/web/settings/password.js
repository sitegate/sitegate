'use strict'
const passwordView = require('./views/password')
const joi = require('joi')
const preUser = require('../pre-user')

exports.register = function(plugin, options, next) {
  plugin.route({
    method: 'GET',
    path: '/settings/password',
    config: {
      pre: [preUser],
      handler: function(req, reply) {
        reply.vtree(passwordView({
          hasPassword: typeof req.pre.user.hash !== 'undefined',
        }))
      },
    },
  })

  plugin.route({
    method: 'POST',
    path: '/settings/password',
    config: {
      pre: [preUser],
      validate: {
        payload: {
          currentPassword: joi.string(),
          newPassword: joi.string().min(1),
          verifyPassword: joi.equal(joi.ref('newPassword')),
        },
      },
      handler: function(req, reply) {
        let userService = req.server.plugins['jimbo-client'].user
        let sessionService = req.server.plugins['jimbo-client'].session

        userService.changePassword({
          userId: req.pre.user.id,
          currentPassword: req.payload.currentPassword,
          newPassword: req.payload.newPassword,
        }, function(err, user) {
          if (err) {
            return renderPasswordPage(req, res, {
              messages: {
                error: req.i18n.t('account.error.' + err.type || 'unknown'),
              },
            })
          }

          sessionService.destroyByUserId({
            usedId: user.id,
            exceptId: req.sessionID,
          })

          req.login(user, function(err) {
            if (err) {
              return res.status(400).send(err)
            }
            return renderPasswordPage(req, res, {
              messages: {
                success: req.i18n.t('settings.passwordChangedSuccessfully'),
              },
            })
          })
        })
      },
    },
  })

  next()
}

exports.register.attributes = {
  name: 'web/settings/password',
}
