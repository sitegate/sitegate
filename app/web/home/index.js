'use strict';

exports.register = function(plugin, options, next) {

  plugin.route({
    method: 'GET',
    path: '/about',
    handler: function(request, reply) {

      reply('This is homepage');
    }
  });

  next();
};

exports.register.attributes = {
  name: 'web/home'
};
