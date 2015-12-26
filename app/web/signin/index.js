'use strict';

const signinView = require('./views/signin');
const preSession = require('humble-session').pre;

exports.register = function(plugin, options, next) {
  plugin.route({
    method: 'GET',
    path: '/signin',
    config: {
      auth: {
        mode: 'try',
      },
    },
    handler(request, reply) {
      if (request.auth.isAuthenticated) return reply.redirect('/');

      reply.vtree(signinView({}));
    }
  });

  plugin.route({
    method: 'POST',
    path: '/signin',
    config: {
      auth: false
    },
    handler(req, reply) {
      let userService = req.server.plugins.user;
      let sessionService = req.server.plugins.session;

      userService.authenticate({
        usernameOrEmail: req.payload.username,
        password: req.payload.password
      }, function(err, user) {
        if (err) return reply(err);

        reply.setSession({
          user: {
            id: user.id
          }
        }, function(err) {
          if (err) return reply(err);

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
      handler(req, reply) {
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
