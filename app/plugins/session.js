'use strict';

var session = require('../clients/session');

exports.register = function(server, opts, next) {
  server.expose(session);
  next();
};

exports.register.attributes = {
  name: 'session'
};
