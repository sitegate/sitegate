'use strict';

var signinView = require('../../views/signin');

exports.register = function(plugin, options, next) {
  plugin.route({
    method: 'GET',
    path: '/signin',
    handler: function(request, reply) {
      reply.vtree(signinView({}));
    }
  });

  plugin.route({
    method: 'POST',
    path: '/signin',
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

        var sid = Math.random();
        sessionService.set(sid, {
          userId: user.id
        }, {
          ttl: 60 * 60 * 24 * 14 // 2 weeks
        }, function(err, sessionDoc) {
          if (err) {
            reply(err);
            return;
          }

          req.auth.session.set({sid: sid});

          reply.redirect('/');
        });
      });
    }
  });

  plugin.route({
    method: ['GET', 'POST', 'DELETE'],
    path: '/signout',
    handler: function(req, reply) {
      var sessionService = req.server.plugins.session;
      var credentials = req.auth.credentials || { session: {} };
      var session = credentials.session || {};

      sessionService.destroy(session.sid, function(err, sessionDoc) {
        if (err) {
          return reply(err);
        }

        if (!sessionDoc) {
          return reply({ message: 'Session not found.' }).code(404);
        }

        req.auth.session.clear();
        reply.redirect('/signin');
      });
    }
  });

  next();
};

exports.register.attributes = {
  name: 'web/signin'
};
