'use strict';

var routes = require('./routes');

exports.register = function(server, opts, next) {
  opts = opts || {};

  if (opts.facebook.enabled) {
    server.auth.strategy('facebook', 'bell', opts.facebook);
  }

  if (opts.google.enabled) {
    server.auth.strategy('google', 'bell', opts.google);
  }

  if (opts.twitter.enabled) {
    server.auth.strategy('twitter', 'bell', opts.twitter);
  }

  server.auth.strategy('default', 'session', true, {
    redirectTo: '/signin'
  });

  //Added a separate file for just routes.
  routes.forEach(function(route) {
    if (!route.config || !route.config.auth || opts[route.config.auth] &&
      opts[route.config.auth].enabled) {
      server.route(route);
    }
  });
  next();
};

exports.register.attributes = {
  name: 'auth'
};
