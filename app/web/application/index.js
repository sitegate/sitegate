'use strict';

const applicationsView = require('./views/applications');
const editAppView = require('./views/applications-edit');
const newAppView = require('./views/applications-new');
const preSession = require('humble-session').pre;
const t = require('i18next').t;
const Boom = require('boom');

exports.register = function(plugin, options, next) {
  plugin.route({
    method: 'GET',
    path: '/settings/applications',
    config: {
      pre: [preSession]
    },
    handler: function(request, reply) {
      var clientService = request.server.plugins.client;
      var userService = request.server.plugins.user;
      var userId = request.pre.session.user.id;

      clientService.query({
        creatorId: userId,
        count: 20,
        fields: ['name']
      }, function(err, userClients) {
        if (err) {
          //
        }

        userService.getTrustedClients(userId, function(err, clients) {
          reply.vtree(applicationsView({
            title: t('app.apps'),
            trustedClients: clients,
            clients: userClients
          }));
        });
      });
    }
  });

  plugin.route({
    method: 'GET',
    path: '/settings/applications/new',
    handler: function(request, reply) {
      reply.vtree(newAppView({}));
    }
  });

  plugin.route({
    method: 'POST',
    path: '/settings/applications/new',
    config: {
      pre: [preSession]
    },
    handler: function(req, reply) {
      var clientService = req.server.plugins.client;

      clientService.create({
        name: req.payload.name,
        description: req.payload.description,
        homepageUrl: req.payload.homepageUrl,
        authCallbackUrl: req.payload.authCallbackUrl,
        userId: req.pre.session.user.id
      }, function(err, client) {
        if (err) {
          return reply(err);
        }

        return reply.redirect('/settings/applications/' + client.id);
      });
    }
  });

  plugin.route({
    method: 'GET',
    path: '/settings/applications/{id}',
    config: {
      pre: [preSession]
    },
    handler: function(req, reply) {
      var clientService = req.server.plugins.client;

      clientService.getById(req.params.id, function(err, client) {
        if (err) {
          return reply(err);
        }

        if (client.userId !== req.pre.session.user.id) {
          return reply('You cannot view an app that was created by another user');
        }

        return reply.vtree(editAppView(client));
      });
    }
  });

  plugin.route({
    method: 'POST',
    path: '/settings/applications/{id}',
    config: {
      pre: [preSession]
    },
    handler: function(req, reply) {
      var clientService = req.server.plugins.client;

      clientService.update(req.params.id, {
        name: req.payload.name,
        description: req.payload.description,
        homepageUrl: req.payload.homepageUrl,
        authCallbackUrl: req.payload.authCallbackUrl
      }, {
        allow: {
          userId: req.pre.session.user.id
        }
      }, function(err, client) {
        if (err) {
          return reply(err);
        }

        return reply.redirect('/settings/applications');
      });
    }
  });

  plugin.route({
    method: 'DELETE',
    path: '/settings/applications/{id}',
    config: {
      pre: [preSession]
    },
    handler: function(req, reply) {
      var clientService = req.server.plugins.client;

      clientService.getById(req.params.id, function(err, client) {
        if (err) {
          return reply(Boom.wrap(err));
        }

        if (!client) {
          return reply(Boom.notFound('client not found'));
        }

        if (client.userId !== req.pre.session.user.id) {
          return reply(Boom.badRequest('Only the creator can remove a client'));
        }

        clientService.remove(req.params.id, function(err) {
          if (err) {
            return reply(Boom.wrap(err));
          }
          return reply('Success');
        });
      });
    }
  });

  next();
};

exports.register.attributes = {
  name: 'web/application'
};
