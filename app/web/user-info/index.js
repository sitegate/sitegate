'use strict';

module.exports = function(server, opts, next) {
  server.route({
    method: 'GET',
    path: '/api/userinfo',
    config: {
      auth: 'bearer',
    },
    handler: function(req, reply) {
      reply({
        id: req.auth.credentials.id,
        username: req.auth.credentials.username,
        email: req.auth.credentials.email
      });
    },
  });

  next();
};

module.exports.attributes = {
  name: 'web/user-info'
};
