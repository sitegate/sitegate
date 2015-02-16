/* jshint node:true */
'use strict';

/**
 * Module dependencies.
 */
var User = require('../models/user'),
  config = require('../../config/config'),
  i18n = require('i18next');

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
  user.displayName = user.firstName + ' ' + user.lastName;

  User.register(user, req.body.password, function (err, user) {
    if (err) {
      return res.render('signup', {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        error: i18n.t('account.error.' + (err.name || 'unknown'))
      });
    }

    req.login(user, function (err) {
      if (err) {
        res.status(400).send(err);
      } else {
        return require('../go-callback')(req, res, next);
      }
    });
  });
};