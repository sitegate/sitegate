'use strict';

//Add all the routes related to Auth Plugin here.
var handlers = require('./handlers');

module.exports = [{
  path: '/auth/facebook',
  method: 'GET',
  config: {
    auth: 'facebook',
    handler: handlers.sessionManagement
  }

}, {
  path: '/auth/google',
  method: 'GET',
  config: {
    auth: 'google',
    handler: handlers.sessionManagement
  }
}, {
  path: '/logout',
  method: 'GET',
  config: {
    handler: function(request, reply) {
      request.auth.session.clear();
      return reply.redirect('/');
    }
  }
}];
