'use strict';

const routes = require('./routes');
const R = require('ramda');

exports.register = function(server, opts, next) {
  let bellOpts = {
    forceHttps: opts.forceHttps,
  };

  ['facebook', 'google', 'twitter'].forEach(function(provider) {
    if (!opts[provider]) return;
    server.auth.strategy(provider, 'bell', R.merge(bellOpts, opts[provider]));
  });

  server.auth.strategy('default', 'session', true, {
    redirectTo: '/signin',
    appendNext: true,
  });

  //Added a separate file for just routes.
  routes.forEach(function(route) {
    if (!route.config || !route.config.auth || opts[route.config.auth]) {
      server.route(route);
    }
  });
  next();
};

exports.register.attributes = {
  name: 'auth'
};
