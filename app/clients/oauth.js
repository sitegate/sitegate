'use strict';

var createClient = require('./create-client');

module.exports = createClient('oauth', [
  'exchange',
  'createCode',
  'authToken',
  'isTrusted'
]);
