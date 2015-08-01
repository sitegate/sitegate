'use strict';

var createClient = require('./create-client');

module.exports = createClient('session', [
  'destroyByUserId'
]);
