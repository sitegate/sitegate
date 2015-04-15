'use strict';

var bo = require('bograch');
var config = require('../../config/config');

var client = bo.client('amqp', {
  name: 'user',
  amqpURL: config.get('amqpUrl')
});

client.register([
  'getById',
  'getByUsername',
  'update',
  'requestPasswordChangeByEmail',
  'validateResetToken',
  'changePasswordUsingToken',
  'sendVerificationEmail',
  'register',
  'saveOAuthUserProfile',
  'disconnectProvider',
  'trustClient',
  'changePassword',
  'verifyEmailByToken',
  'getTrustedClients',
  'authenticate'
]);

client.connect();

module.exports = client.methods;
