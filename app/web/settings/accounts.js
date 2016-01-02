'use strict';

const accountsView = require('./views/accounts');
const preUser = require('../pre-user');

exports.register = function(plugin, options, next) {
  plugin.route({
    method: 'GET',
    path: '/settings/accounts',
    config: {
      pre: [preUser],
      handler: function(req, reply) {
        reply.vtree(accountsView({
          user: req.pre.user,
        }));
      },
    },
  });

  next();
};

exports.register.attributes = {
  name: 'web/settings/accounts',
};
