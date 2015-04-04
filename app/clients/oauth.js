'use strict';

var bo = require('bograch');
var config = require('../../config/config');

var client = bo.client('amqp', {
  name: 'oauth',
  amqpURL: config.get('amqpURL')
});

client.register([
  'exchange',
  'createCode',
  'authToken',
  'isTrusted'
]);

client.connect();

module.exports = client.methods;