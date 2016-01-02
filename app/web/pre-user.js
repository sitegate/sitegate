'use strict';

module.exports = {
  assign: 'user',
  method: function(req, reply) {
    let userService = req.server.plugins.user;

    if (!req.auth || !req.auth.credentials || !req.auth.credentials.id) {
      return reply('session not defined').takeover();
    }

    userService.getById(req.auth.credentials.id, function(err, user) {
      if (err) {
        return reply('user not found').takeover();
      }
      reply(user);
    });
  },
};
