/* jshint node:true */
'use strict';

var User = require('../models/user');
var config = require('../../config/config');
var i18n = require('i18next');
var sendVerificationEmail = require('../send-verification-email');

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
        sendVerificationEmail(req, user);
        return require('../go-callback')(req, res, next);
      }
    });
  });
};