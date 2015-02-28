/* jshint node:true */
'use strict';

var User = require('../models/user'),
  config = require('../../config/config'),
  i18n = require('i18next'),
  nodemailer = require('nodemailer'),
  crypto = require('crypto');

exports.get = function (req, res, next) {
  res.render('signup', {
    title: req.i18n.t('account.signUp'),
    cancelUrl: config.sitegateClient.domain + config.sitegateClient.publicHomepage
  });
};

/**
 * Signup
 */
exports.post = function (req, res, next) {
  var user = new User(req.body);

  // Add missing user fields
  user.provider = 'local';
  user.emailVerified = false;

  User.register(user, req.body.password, function (err, user) {
    if (err) {
      return res.render('signup', {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        messages: {
          error: i18n.t('account.error.' + (err.name || 'unknown'))
        }
      });
    }

    req.login(user, function (err) {
      if (err) {
        res.status(400).send(err);
      } else {
        sendVerificationEmail(res, user);
        return require('../go-callback')(req, res, next);
      }
    });
  });
};

function sendVerificationEmail(res, user) {
  crypto.randomBytes(20, function (err, buffer) {
    var token = buffer.toString('hex');

    user.emailVerificationToken = token;

    user.save(function (err, user) {
      if (!err && user) {
        res.render('email-templates/email-verification-email', {
          username: user.username,
          emailVerificationToken: user.emailVerificationToken
        }, function (err, emailHtml) {
          if (!err) {
            var smtpTransport = nodemailer.createTransport(config.mailer.options);
            var mailOptions = {
              to: user.email,
              from: config.mailer.from,
              subject: i18n.t('email.emailVerification.subject'),
              html: emailHTML
            };
            smtpTransport.sendMail(mailOptions);
          }
        })
      }
    });
  });
}