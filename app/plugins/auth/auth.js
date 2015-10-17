'use strict';

var routes = require('./routes');

exports.register = function(server, opts, next) {
  opts = opts || {};

  server.auth.strategy('facebook', 'bell', opts.facebook);

  server.auth.strategy('google', 'bell', opts.google);

  server.auth.strategy('session', 'cookie', {
    password: opts.session.secret,
    cookie: 'sid-sg', // cookie name to use, usually sid-<appname>
    redirectTo: '/signin',
    isSecure: true,
    validateFunc: function(req, session, cb) {
      var sessionService = req.server.plugins.session;

      sessionService.get(session.sid, function(err, session) {
        if (err) {
          return cb(err, false);
        }

        if (!session) {
          return cb(null, false);
        }

        return cb(null, true, session);
      });
    }
  });

  //Added a separate file for just routes.
  server.route(routes);
  next();
};

exports.register.attributes = {
  name: 'auth'
};
