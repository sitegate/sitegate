'use strict'
const applicationsView = require('./views/applications')
const editAppView = require('./views/applications-edit')
const newAppView = require('./views/applications-new')
const appView = require('./views/applications-view')
const t = require('i18next').t

exports.register = (server, options) => {
  const clientService = server.plugins.jimboClient.client
  const userService = server.plugins.jimboClient.user

  server.route({
    method: 'GET',
    path: '/settings/applications',
    handler (req, res) {
      let userClients

      clientService.query({
        creatorId: req.user.id,
        count: 20,
        fields: ['name'],
      })
      .then(userClients$ => {
        userClients = userClients$
        return userService.getTrustedClients({userId: req.user.id})
      })
      .then(clients => {
        res.vtree(applicationsView({
          title: t('app.apps'),
          trustedClients: clients,
          clients: userClients,
        }))
      })
      .catch(err => res.send(err))
    },
  })

  server.route({
    method: 'GET',
    path: '/settings/applications/new',
    handler (req, res) {
      res.vtree(newAppView({}))
    },
  })

  server.route({
    method: 'POST',
    path: '/settings/applications/new',
    handler (req, res) {
      clientService.create({
        name: req.body.name,
        description: req.body.description,
        homepageUrl: req.body.homepageUrl,
        authCallbackUrl: req.body.authCallbackUrl,
        userId: req.user.id,
      }, (err, client) => {
        if (err) return res.send(err)

        return res.redirect('/settings/applications/' + client.id)
      })
    },
  })

  server.route({
    method: 'GET',
    path: '/settings/applications/:id',
    handler (req, res) {
      clientService.getById({ id: req.params.id }, function(err, client) {
        if (err) return res.send(err)

        if (client.userId !== req.user.id)
          return res.send('You cannot view an app that was created by another user')

        return res.vtree(editAppView(client))
      })
    },
  })

  server.route({
    method: 'GET',
    path: '/settings/connections/:id',
    handler (req, res) {
      clientService.getById({ id: req.params.id }, (err, client) => {
        if (err) return res.send(err)

        return res.vtree(appView(client))
      })
    },
  })

  server.route({
    method: 'POST',
    path: '/settings/applications/:id',
    handler (req, res) {
      clientService.update({
        id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        homepageUrl: req.body.homepageUrl,
        authCallbackUrl: req.body.authCallbackUrl,
        security: {
          allow: {
            userId: req.user.id,
          },
        },
      }, (err, client) => {
        if (err) return res.send(err)

        return res.redirect('/settings/applications')
      })
    },
  })

  server.route({
    method: 'DELETE',
    path: '/settings/applications/:id',
    handler (req, res) {
      clientService.getById({ id: req.params.id }, (err, client) => {
        if (err) return res.status(400).send(err)

        if (!client) return res.status(400).send('client not found')

        if (client.userId !== req.user.id) {
          return res.status(400).send('Only the creator can remove a client')
        }

        clientService.remove(req.params.id, err => {
          if (err) return res.status(400).send(err)

          return res.status(200).send('Success')
        })
      })
    },
  })

  server.route({
    method: 'POST',
    path: '/settings/applications/revoke/:id',
    handler (req, res) {
      userService.revokeClientAccess({
        userId: req.user.id,
        clientId: req.params.id,
      }, err => {
        if (err) return res.status(400).send(err)

        res.send('Success')
      })
    },
  })

  server.route({
    method: 'POST',
    path: '/settings/applications/revoke-all',
    handler (req, res) {
      userService.revokeAllClientsAccess({
        userId: req.user.id,
      }, err => {
        if (err) return res.status(400).send(err)

        res.send('Success')
      })
    },
  })
}

exports.register.attributes = {
  name: 'web/application',
}
