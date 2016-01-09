'use strict';

const profileView = require('./views/profile');
const errorHandler = require('../../error-handler');
const preUser = require('../pre-user');
const Boom = require('boom');
const preSession = require('humble-session').pre;
const humbleFlash = require('humble-flash');

exports.register = function(plugin, options, next) {
  plugin.route({
    method: 'GET',
    path: '/settings',
    handler: function(req, reply) {
      reply.redirect('/settings/profile');
    },
  });

  plugin.route({
    method: 'GET',
    path: '/settings/profile',
    config: {
      pre: [
        preUser,
        humbleFlash.createPreHandler('profileSuccessMessages'),
      ],
    },
    handler: function(req, reply) {
      reply.vtree(profileView({
        user: req.pre.user,
        messages: {
          success: req.pre.profileSuccessMessages,
        },
      }));
    },
  });

  plugin.route({
    method: 'POST',
    path: '/settings/profile',
    config: {
      handler: function(req, reply) {
        let userService = req.server.plugins['jimbo-client'].user

        let userToReturn = req.payload.user
        userService.update(req.auth.credentials.userId, {
          username: req.payload.user.username,
          email: req.payload.user.email,
        }, function(err, user, info) {
          if (err) {
            return reply.vtree(profileView({
              user: userToReturn,
              messages: {
                error: errorHandler.getErrorMessage(err),
              },
            }));
          }
          return reply.vtree(profileView({
            user: userToReturn,
            messages: {
              success: 'Profile was updated' + (info.emailHasBeenUpdated ?
                'Verification email was sent' : ''),
            },
          }));
        });
      },
    },
  });

  plugin.route({
    method: 'POST',
    path: '/resend-email-verification',
    config: {
      auth: 'default',
      pre: [preSession],
    },
    handler: function(req, reply) {
      let userService = req.server.plugins['jimbo-client'].user

      userService.sendVerificationEmail(req.pre.session.user.id, function(err) {
        if (err) {
          return reply(Boom.wrap(err));
        }

        return reply({
          message: 'Verification has been sent out',
        });
      });
    },
  });

  next();
};

exports.register.attributes = {
  name: 'web/settings/profile',
};
