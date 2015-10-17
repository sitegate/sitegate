'use strict';

exports.register = function(plugin, options, next) {
  plugin.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public',
        listing: true
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'public'
};
