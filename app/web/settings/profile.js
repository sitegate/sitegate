'use strict';

var profileView = require('../../views/settings/profile');
var errorHandler = require('../../error-handler');
var pre = require('./pre');
var Boom = require('boom');
var preSession = require('humble-session').pre;
var humbleFlash = require('humble-flash');

exports.register = function(plugin, options, next) {
  plugin.route({
    method: 'GET',
    path: '/settings',
    handler: function(req, reply) {
      reply.redirect('/settings/profile');
    }
  });

  plugin.route({
    method: 'GET',
    path: '/settings/profile',
    config: {
      pre: [
        pre.user,
        humbleFlash.createPreHandler('profileSuccessMessages')
      ]
    },
    handler: function(req, reply) {
      reply.vtree(profileView({
        user: req.pre.user,
        /*homepageUrl: config.get('sitegateClient.domain') +
          config.get('sitegateClient.privateHomepage'),*/
        messages: {
          success: req.pre.profileSuccessMessages
        }
      }));
    }
  });

  plugin.route({
    method: 'POST',
    path: '/settings/profile',
    config: {
      handler: function(req, reply) {
        var userService = req.server.plugins.user;

        var userToReturn = req.payload.user;
        userService.update(req.auth.credentials.userId, {
          username: req.payload.user.username,
          email: req.payload.user.email
        }, function(err, user, info) {
          if (err) {
            return reply.vtree(profileView({
              user: userToReturn,
              messages: {
                error: errorHandler.getErrorMessage(err)
              }
            }));
          }
          return reply.vtree(profileView({
            user: userToReturn,
            messages: {
              success: 'Profile was updated' + (info.emailHasBeenUpdated ?
                'Verification email was sent' : '')
            }
          }));
        });
      }
    }
  });

  plugin.route({
    method: 'POST',
    path: '/resend-email-verification',
    config: {
      auth: 'default',
      pre: [preSession]
    },
    handler: function(req, reply) {
      var userService = req.server.plugins.user;

      userService.sendVerificationEmail(req.pre.session.user.id, function(err) {
        if (err) {
          return reply(Boom.wrap(err));
        }

        return reply({
          message: 'Verification has been sent out'
        });
      });
    }
  });

  next();
};

exports.register.attributes = {
  name: 'web/settings/profile'
};