/* jshint node:true */
'use strict';

var User = require('../models/user'),
  config = require('../../config/config'),
  i18n = require('i18next'),
  crypto = require('crypto'),
  sendEmail = require('../send-email');

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
        sendEmail({
          templateName: 'email-verification-email',
          to: user.email,
          subject: i18n.t('email.emailVerification.subject'),
          locals: {
            username: user.username
          }
        });
      }
    });
  });
}