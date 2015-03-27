'use strict';

var bo = require('bograch');

var client = bo.client('amqp', {
  name: 'client'
});

client.register(['findByCreatorId', 'create', 'getById',
                 'getByPublicId', 'update', 'remove']);

module.exports = client.methods;