'use strict';

var crypto = require('crypto');
var sendEmail = require('./send-email');
var i18n = require('i18next');
var config = require('../config/config');

var ONE_DAY = 1000 * 60 * 60 * 24;

function sendVerificationEmail(req, user) {
  crypto.randomBytes(20, function (err, buffer) {
    var token = buffer.toString('hex');

    user.emailVerified = false;
    user.emailVerificationToken = token;

    user.emailVerificationTokenExpires = Date.now() + ONE_DAY;

    user.save(function (err, user) {
      if (!err && user) {
        sendEmail({
          templateName: 'email-verification-email',
          to: user.email,
          subject: i18n.t('email.emailVerification.subject'),
          locals: {
            username: user.username,
            confirmationUrl: 'http://' + req.headers.host +
              '/verify-email/' + user.emailVerificationToken,
            siteName: config.app.title
          }
        });
      }
    });
  });
}

module.exports = sendVerificationEmail;