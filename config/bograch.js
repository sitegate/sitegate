'use strict';

var bo = require('bograch');
var amqpTransport = require('bograch-amqp');

bo.use(amqpTransport);