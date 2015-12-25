'use strict';

const signupView = require('./views/signup');
const preSession = require('humble-session').pre;
const t = require('i18next').t;

exports.register = function(plugin, options, next) {
  plugin.route({
    method: 'GET',
    path: '/signup',
    config: {
      auth: false
    },
    handler: function(request, reply) {
      reply.vtree(signupView({}));
    }
  });

  plugin.route({
    method: 'POST',
    path: '/signup',
    config: {
      auth: false
    },
    handler: function(req, reply) {
      let userService = req.server.plugins.user;

      let user = req.payload;

      // Add missing user fields
      user.provider = 'local';
      user.displayName = user.firstName + ' ' + user.lastName;
      user.emailVerified = false;

      userService.register(user, function(err, user) {
        if (err) {
          return reply.vtree(signupView({
            username: req.payload.username,
            password: req.payload.password,
            email: req.payload.email,
            messages: {
              error: t('account.error.' + (err.type || 'unknown'))
            }
          }));
        }

        reply.setSession({
          user: {
            id: user.id
          }
        }, function(err) {
          if (err) return reply(err).status(400);

          //TODO: go to the page that the user wanted initially
          return reply.redirect('/');
        });
      });
    }
  });

  next();
};

exports.register.attributes = {
  name: 'web/signup'
};
