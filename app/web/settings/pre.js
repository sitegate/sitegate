'use strict';

exports.user = {
  assign: 'user',
  method: function(req, reply) {
    var userService = req.server.plugins.user;

    if (!req.auth || !req.auth.credentials || !req.auth.credentials.userId) {
      return reply('session not defined').takeover();
    }

    userService.getById(req.auth.credentials.userId, function(err, user) {
      if (err) {
        return reply('user not found').takeover();
      }
      reply(user);
    });
  }
};
