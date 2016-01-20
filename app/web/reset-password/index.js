'use strict'
const errorHandler = require('../../error-handler')
const resetPasswordView = require('./views/reset-password')
const newPasswordView = require('./views/new')
const t = require('i18next').t

exports.register = (server, options) => {
  const userService = server.plugins.jimboClient.user

  server.route({
    method: 'GET',
    path: '/reset-password',
    config: {
      auth: false,
    },
    handler (req, res) {
      res.vtree(resetPasswordView({}))
    },
  })

  server.route({
    method: 'POST',
    path: '/reset-password',
    config: {
      auth: false,
    },
    handler (req, res) {
      userService.requestPasswordChangeByEmail({ email: req.body.email }, (err, info) => {
        if (err) {
          return res.vtree(resetPasswordView({
            messages: {
              error: errorHandler.getErrorMessage(err),
            },
          }))
        }

        return res.vtree(resetPasswordView({
          messages: {
            success: t('account.password.emailSent', {
              email: req.body.email,
            }),
          },
        }))
      })
    },
  })

  server.route({
    method: 'GET',
    path: '/reset/:token',
    config: {
      auth: false,
    },
    handler (req, res) {
      userService.validateResetToken({ token: req.params.token }, err => {
        if (err) {
          return res.vtree(resetPasswordView({
            messages: {
              error: t('account.password.invalidResetToken'),
            },
          }))
        }

        res.vtree(newPasswordView({}))
      })
    },
  })

  server.route({
    method: 'POST',
    path: '/reset/:token',
    config: {
      auth: false,
    },
    handler (req, res) {
      let passwordDetails = req.body

      if (passwordDetails.newPassword !== passwordDetails.repeatPassword) {
        return res.vtree(newPasswordView({
          messages: {
            error: t('account.password.passwordsDoNotMatch'),
          },
        }))
      }

      userService.changePasswordUsingToken({
        token: req.params.token,
        newPassword: passwordDetails.newPassword,
      }, (err, user) => {
        if (err || !user) {
          return res.vtree({
            messages: {
              error: t('account.password.invalidResetToken'),
            },
          })
        }

        req.login(user, err => {
          if (err) {
            return res.vtree(newPasswordView({
              messages: {
                error: err,
              },
            }))
          }

          res.redirect('/')
        })
      })
    },
  })
}

exports.register.attributes = {
  name: 'web/reset-password',
}
