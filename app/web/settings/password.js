'use strict'
const passwordView = require('./views/password')
const joi = require('joi')
const preUser = require('../pre-user')
const preSession = require('humble-session').pre
const boom = require('boom')
const i18n = require('i18next')

exports.register = function(plugin, options, next) {
  plugin.route({
    method: 'GET',
    path: '/settings/password',
    config: {
      pre: [preUser],
      handler(req, reply) {
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
      pre: [preUser, preSession],
      validate: {
        payload: {
          currentPassword: joi.string(),
          newPassword: joi.string().min(1),
          verifyPassword: joi.equal(joi.ref('newPassword')),
        },
      },
      handler(req, reply) {
        let userService = req.server.plugins['jimbo-client'].user
        let sessionService = req.server.plugins['jimbo-client'].session

        userService.changePassword({
          userId: req.pre.user.id,
          currentPassword: req.payload.currentPassword,
          newPassword: req.payload.newPassword,
        }, function(err, user) {
          if (err) {
            return reply({
              messages: {
                error: i18n.t('account.error.' + err.type || 'unknown'),
              },
            })
          }

          sessionService.destroyByUserId({
            userId: user.id,
            exceptId: req.pre.session.sid,
          })

          reply.login(user, function(err) {
            if (err) return reply(boom.wrap(err))

            return reply({
              messages: {
                success: i18n.t('settings.passwordChangedSuccessfully'),
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
