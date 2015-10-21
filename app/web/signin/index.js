'use strict';

var signinView = require('../../views/signin');
var preSession = require('humble-session').pre;

exports.register = function(plugin, options, next) {
  plugin.route({
    method: 'GET',
    path: '/signin',
    config: {
      auth: false
    },
    handler: function(request, reply) {
      reply.vtree(signinView({}));
    }
  });

  plugin.route({
    method: 'POST',
    path: '/signin',
    config: {
      auth: false
    },
    handler: function(req, reply) {
      var userService = req.server.plugins.user;
      var sessionService = req.server.plugins.session;

      userService.authenticate({
        usernameOrEmail: req.payload.username,
        password: req.payload.password
      }, function(err, user) {
        if (err) {
          reply(err);
          return;
        }

        reply.setSession({
          user: {
            id: user.id
          }
        }, function(err) {
          if (err) {
            reply(err);
            return;
          }

          reply.redirect('/');
        });
      });
    }
  });

  plugin.route({
    method: ['GET', 'POST', 'DELETE'],
    path: '/signout',
    config: {
      pre: [preSession],
      handler: function(req, reply) {
        delete req.pre.session.user;
        reply.setSession(req.pre.session, function(err) {
          if (err) {
            return reply(err);
          }

          reply.redirect('/signin');
        });
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'web/signin'
};
