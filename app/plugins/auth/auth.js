'use strict';

var routes = require('./routes');

exports.register = function(server, opts, next) {
  opts = opts || {};

  server.auth.strategy('facebook', 'bell', opts.facebook);

  server.auth.strategy('google', 'bell', opts.google);

  server.auth.strategy('twitter', 'bell', opts.twitter);

  server.auth.strategy('default', 'session', true, {
    redirectTo: '/signin'
  });

  //Added a separate file for just routes.
  server.route(routes);
  next();
};

exports.register.attributes = {
  name: 'auth'
};
