'use strict';

var createClient = require('./create-client');

module.exports = createClient('client', [
  'create',
  'getById',
  'query',
  'getByPublicId',
  'update',
  'remove'
]);
