'use strict';

var profileView = require('../views/settings/profile');

exports.register = function(plugin, options, next) {
  plugin.route({
    method: 'GET',
    path: '/settings/profile',
    config: {
      auth: 'session',
      pre: [
        {
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
        }
      ],
      handler: function(req, reply) {
        reply.vtree(profileView({
          user: req.pre.user/*,
          homepageUrl: config.get('sitegateClient.domain') +
            config.get('sitegateClient.privateHomepage'),
          messages: {
            success: req.flash('profileSuccessMessages')
          }*/
        }));
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'web/settings/profile'
};
