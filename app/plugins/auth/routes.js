'use strict';

//Add all the routes related to Auth Plugin here.
var handlers = require('./handlers');
var preSession = require('humble-session').pre;

module.exports = [{
  path: '/auth/facebook',
  method: 'GET',
  config: {
    auth: 'facebook',
    pre: [preSession],
    handler: handlers.sessionManagement
  }
}, {
  path: '/auth/google',
  method: 'GET',
  config: {
    auth: 'google',
    pre: [preSession],
    handler: handlers.sessionManagement
  }
}, {
  path: '/auth/twitter',
  method: 'GET',
  config: {
    auth: 'twitter',
    pre: [preSession],
    handler: handlers.sessionManagement
  }
}, {
  path: '/auth/{strategy}/disconnect',
  method: 'GET',
  handler: function(req, reply) {
    var userService = req.server.plugins.user;

    userService.disconnectProvider({
      userId: req.auth.credentials.id,
      strategy: req.params.strategy
    }, function(err) {
      if (err) {
        return reply(err);
      }

      return reply.redirect('/settings/accounts');
    });
  }
}/*, {
  path: '/signout',
  method: 'GET',
  config: {
    handler: function(request, reply) {
      request.auth.session.clear();
      return reply.redirect('/');
    }
  }
}*/];
