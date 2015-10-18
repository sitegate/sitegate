'use strict';

var profileView = require('../../views/settings/profile');
var errorHandler = require('../../error-handler');
var pre = require('./pre');

exports.register = function(plugin, options, next) {
  plugin.route({
    method: 'GET',
    path: '/settings/profile',
    config: {
      auth: 'session',
      pre: [pre.user],
      handler: function(req, reply) {
        reply.vtree(profileView({
          user: req.pre.user/*,
          homepageUrl: config.get('sitegateClient.domain') +
            config.get('sitegateClient.privateHomepage'),
          messages: {
            success: req.flash('profileSuccessMessages')
          }*/
        }));
      }
    }
  });

  plugin.route({
    method: 'POST',
    path: '/settings/profile',
    config: {
      auth: 'session',
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

  next();
};

exports.register.attributes = {
  name: 'web/settings/profile'
};
