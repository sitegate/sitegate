'use strict';

var errorHandler = require('../../error-handler');
var resetPasswordView = require('../../views/reset-password');
var preSession = require('humble-session').pre;
var t = require('i18next').t;

exports.register = function(plugin, options, next) {
  plugin.route({
    method: 'GET',
    path: '/reset-password',
    config: {
      auth: false
    },
    handler: function(request, reply) {
      reply.vtree(resetPasswordView({}));
    }
  });

  plugin.route({
    method: 'POST',
    path: '/reset-password',
    config: {
      auth: false
    },
    handler: function(req, reply) {
      var userService = req.server.plugins.user;

      userService.requestPasswordChangeByEmail(req.payload.email, function(err, info) {
        if (err) {
          return reply.vtree(resetPasswordView({
            messages: {
              error: errorHandler.getErrorMessage(err)
            }
          }));
        }

        return reply.vtree(resetPasswordView({
          messages: {
            success: t('account.password.emailSent', {
              email: req.payload.email
            })
          }
        }));
      });
    }
  });

  next();
};

exports.register.attributes = {
  name: 'web/reset-password'
};
