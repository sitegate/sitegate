'use strict';

var bo = require('bograch');

var client = bo.client('amqp', {
  name: 'user'
});

client.register([
  'getById', 'update', 'requestPasswordChangeByEmail',
  'validateResetToken', 'changePasswordUsingToken',
  'sendVerificationEmail', 'register',
  'saveOAuthUserProfile', 'disconnectProvider',
  'trustClient', 'changePassword', 'verifyEmailByToken',
  'getTrustedClients', 'authenticate'
]);

module.exports = client.methods;