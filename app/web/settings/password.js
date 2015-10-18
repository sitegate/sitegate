'use strict';

var passwordView = require('../../views/settings/password');
var Joi = require('joi');
var pre = require('./pre');

exports.register = function(plugin, options, next) {
  plugin.route({
    method: 'GET',
    path: '/settings/password',
    config: {
      auth: 'session',
      pre: [pre.user],
      handler: function(req, reply) {
        reply.vtree(passwordView({
          hasPassword: typeof req.pre.user.hash !== 'undefined'
        }));
      }
    }
  });

  plugin.route({
    method: 'POST',
    path: '/settings/password',
    config: {
      auth: 'session',
      validate: {
        payload: {
          newPassword: Joi.string().min(1),
          verifyPassword: Joi.equal(Joi.ref('newPassword'))
        }
      },
      handler: function(req, reply) {
        var userService = req.server.plugins.user;
        var sessionService = req.server.plugins.session;

        userService.changePassword({
          userId: req.user.id,
          currentPassword: req.payload.currentPassword,
          newPassword: req.payload.newPassword
        }, function(err, user) {
          if (err) {
            return renderPasswordPage(req, res, {
              messages: {
                error: req.i18n.t('account.error.' + err.type || 'unknown')
              }
            });
          }

          sessionService.destroyByUserId(user.id, req.sessionID);

          req.login(user, function(err) {
            if (err) {
              return res.status(400).send(err);
            }
            return renderPasswordPage(req, res, {
              messages: {
                success: req.i18n.t('settings.passwordChangedSuccessfully')
              }
            });
          });
        });
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'web/settings/password'
};
