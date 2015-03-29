'use strict';

var bo = require('bograch');

var client = bo.client('amqp', {
  name: 'client'
});

client.register(['create', 'getById', 'query',
                 'getByPublicId', 'update', 'remove']);

module.exports = client.methods;