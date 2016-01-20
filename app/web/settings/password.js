'use strict'
const passwordView = require('./views/password')
const joi = require('joi')
const boom = require('boom')
const i18n = require('i18next')

exports.register = server => {
  const userService = server.plugins.jimboClient.user
  const sessionService = server.plugins.jimboClient.session

  server.route({
    method: 'GET',
    path: '/settings/password',
    config: {
      loadUser: true,
    },
    handler (req, res) {
      res.vtree(passwordView({
        hasPassword: typeof req.pre.user.hash !== 'undefined',
      }))
    },
  })

  server.route({
    method: 'POST',
    path: '/settings/password',
    config: {
      validate: {
        body: {
          currentPassword: joi.string(),
          newPassword: joi.string().min(1),
          verifyPassword: joi.equal(joi.ref('newPassword')),
        },
      },
      loadUser: true,
    },
    handler (req, res) {
      userService.changePassword({
        userId: req.pre.user.id,
        currentPassword: req.body.currentPassword,
        newPassword: req.body.newPassword,
      }, (err, user) => {
        if (err) {
          return res.vtree(passwordView({
            hasPassword: typeof req.pre.user.hash !== 'undefined',
            messages: {
              error: i18n.t('account.error.' + err.type || 'unknown'),
            },
          }))
        }

        /*sessionService.destroyByUserId({
          userId: user.id,
          exceptId: req.pre.session.sid,
        })*/

        req.login(user, err => {
          if (err) return res.send(boom.wrap(err))

          return res.vtree(passwordView({
            hasPassword: typeof req.pre.user.hash !== 'undefined',
            messages: {
              success: i18n.t('settings.passwordChangedSuccessfully'),
            },
          }))
        })
      })
    },
  })
}

exports.register.attributes = {
  name: 'web/settings/password',
}
