'use strict';

const oauth = require('../clients/oauth');

exports.register = function(server, opts, next) {
  server.expose(oauth);
  next();
};

exports.register.attributes = {
  name: 'ms/oauth',
};
