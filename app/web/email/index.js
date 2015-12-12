'use strict';

var R = require('ramda');
var Boom = require('boom');
var preSession = require('humble-session').pre;

exports.register = function(plugin, options, next) {
  plugin.route({
    method: 'GET',
    path: '/verify-email/{token}',
    config: {
      pre: [preSession],
      handler: function(req, reply) {
        var userService = req.server.plugins.user;

        userService.verifyEmailByToken(req.params.token, function(err, user) {
          if (err) {
            var msg = 'Email verification token is invalid or has expired.';
            return reply(Boom.notFound(msg));
          }

          reply.flash('profileSuccessMessages', 'You have successfully verified your email address');
          reply.login(R.pick(['id'], user), function(err) {
            if (err) {
              return reply(Boom.create(400, 'Couldn\'t log in', err));
            }

            reply.redirect('/settings/profile');
          });
        });
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'web/email'
};