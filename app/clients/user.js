'use strict';

var createClient = require('./create-client');

module.exports = createClient('user', [
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
