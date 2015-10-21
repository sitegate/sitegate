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
