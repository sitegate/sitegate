'use strict';

var user = require('../clients/user');

exports.register = function(server, opts, next) {
  server.expose(user);
  next();
};

exports.register.attributes = {
  name: 'user',
};
