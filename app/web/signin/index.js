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
      var User = req.server.plugins.user;
      var Session = req.server.plugins.session;

      User.authenticate({
        usernameOrEmail: req.payload.username,
        password: req.payload.password
      }, function(err, user) {
        if (err) {
          reply(err);
          return;
        }

        var sid = Math.random();
        Session.set(sid, {
          userId: user.id
        }, {
          ttl: 60 * 60 * 24 * 14 // 2 weeks
        }, function(err, session) {
          if (err) {
            reply(err);
            return;
          }

          console.log();
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
      var Session = req.server.plugins.session;
      var credentials = req.auth.credentials || { session: {} };
      var session = credentials.session || {};

      Session.destroy(session.id, function(err, sessionDoc) {
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
