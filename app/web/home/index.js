'use strict';

var homepageView = require('../../views/home');

exports.register = function(plugin, options, next) {
  plugin.route({
    method: 'GET',
    path: '/',
    config: {
      auth: 'session',
      handler: function(request, reply) {
        reply.vtree(homepageView({}));
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'web/home'
};
