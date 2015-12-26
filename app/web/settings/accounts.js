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
          user: req.pre.user/*,
          title: i18n.t('settings.socialConnections'),
          homepageUrl: config.get('sitegateClient.domain') +
            config.get('sitegateClient.privateHomepage'),
          }*/
        }));
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'web/settings/accounts'
};
