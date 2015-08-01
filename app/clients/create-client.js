'use strict';

var Client = require('uva-amqp').Client;
var config = require('../../config/config');

module.exports = function(channel, methods) {
  var client = new Client({
    channel: channel,
    url: config.get('amqpUrl')
  });

  client.register(methods);

  return client.methods;
};
