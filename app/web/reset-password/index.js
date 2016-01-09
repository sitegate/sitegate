'use strict';

const R = require('ramda');
const errorHandler = require('../../error-handler');
const resetPasswordView = require('./views/reset-password');
const newPasswordView = require('./views/new');
const preSession = require('humble-session').pre;
const t = require('i18next').t;
const Boom = require('boom');

exports.register = function(plugin, options, next) {
  plugin.route({
    method: 'GET',
    path: '/reset-password',
    config: {
      auth: false,
    },
    handler: function(request, reply) {
      reply.vtree(resetPasswordView({}));
    },
  });

  plugin.route({
    method: 'POST',
    path: '/reset-password',
    config: {
      auth: false,
    },
    handler: function(req, reply) {
      let userService = req.server.plugins['jimbo-client'].user

      userService.requestPasswordChangeByEmail(req.payload.email, function(err, info) {
        if (err) {
          return reply.vtree(resetPasswordView({
            messages: {
              error: errorHandler.getErrorMessage(err),
            },
          }));
        }

        return reply.vtree(resetPasswordView({
          messages: {
            success: t('account.password.emailSent', {
              email: req.payload.email,
            }),
          },
        }));
      });
    },
  });

  plugin.route({
    method: 'GET',
    path: '/reset/{token}',
    config: {
      auth: false,
    },
    handler: function(req, reply) {
      let userService = req.server.plugins['jimbo-client'].user

      userService.validateResetToken(req.params.token, function(err) {
        if (err) {
          return reply.vtree(resetPasswordView({
            messages: {
              error: t('account.password.invalidResetToken'),
            },
          }));
        }

        reply.vtree(newPasswordView({}));
      });
    },
  });

  plugin.route({
    method: 'POST',
    path: '/reset/{token}',
    config: {
      pre: [preSession],
      auth: false,
    },
    handler: function(req, reply) {
      let passwordDetails = req.payload;
      let userService = req.service.plugins['jimbo-client'].user

      if (passwordDetails.newPassword !== passwordDetails.repeatPassword) {
        return reply.vtree(newPasswordView({
          messages: {
            error: t('account.password.passwordsDoNotMatch'),
          },
        }));
      }

      userService.changePasswordUsingToken({
        token: req.params.token,
        newPassword: passwordDetails.newPassword,
      }, function(err, user) {
        if (err || !user) {
          return reply.vtree({
            messages: {
              error: t('account.password.invalidResetToken'),
            },
          });
        }

        req.pre.session.user = R.pick(['id'], user);
        reply.setSession(req.pre.session, function(err) {
          if (err) {
            return reply(Boom.create(400, 'Couldn\'t log in', err));
          }

          reply.redirect('/');
        });
      });
    },
  });

  next();
};

exports.register.attributes = {
  name: 'web/reset-password',
};
