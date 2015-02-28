var crypto = require('crypto');
var sendEmail = require('./send-email');
var i18n = require('i18next');

function sendVerificationEmail(req, user) {
  crypto.randomBytes(20, function (err, buffer) {
    var token = buffer.toString('hex');

    user.emailVerified = token;
    user.emailVerificationToken = token;
    user.emailVerificationTokenExpires = Date.now() + 1000 * 60 * 60 * 24; // 1 day

    user.save(function (err, user) {
      if (!err && user) {
        sendEmail({
          templateName: 'email-verification-email',
          to: user.email,
          subject: i18n.t('email.emailVerification.subject'),
          locals: {
            username: user.username,
            confirmationUrl: 'http://' + req.headers.host +
              '/verify-email/' + user.emailVerificationToken
          }
        });
      }
    });
  });
}

module.exports = sendVerificationEmail;