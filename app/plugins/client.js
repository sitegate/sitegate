'use strict';

const client = require('../clients/client');

exports.register = function(server, opts, next) {
  server.expose(client);
  next();
};

exports.register.attributes = {
  name: 'client',
};
