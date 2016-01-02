'use strict';

exports.register = function(plugin, options, next) {
  plugin.route({
    method: 'GET',
    path: '/{param*}',
    config: {
      auth: false,
    },
    handler: {
      directory: {
        path: 'public',
        listing: true,
      },
    },
  });

  next();
};

exports.register.attributes = {
  name: 'public',
};
