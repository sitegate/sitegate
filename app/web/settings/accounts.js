'use strict';

var accountsView = require('./views/accounts');
var pre = require('./pre');

exports.register = function(plugin, options, next) {
  plugin.route({
    method: 'GET',
    path: '/settings/accounts',
    config: {
      pre: [pre.user],
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
