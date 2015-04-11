'use strict';

var bo = require('bograch');
var config = require('../../config/config');

var client = bo.client('amqp', {
  name: 'client',
  amqpURL: config.get('amqpUrl')
});

client.register([
  'create',
  'getById',
  'query',
  'getByPublicId',
  'update',
  'remove'
]);

client.connect();

module.exports = client.methods;
