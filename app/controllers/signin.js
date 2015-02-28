/* jshint node:true */
'use strict';

var passport = require('passport'),
  config = require('../../config/config'),
  i18n = require('i18next');

exports.get = function (req, res, next) {
  res.render('signin', {
    title: req.i18n.t('account.signIn'),
    cancelUrl: config.sitegateClient.domain + config.sitegateClient.publicHomepage,
    messages: {
      error: req.flash('signinMessage')
    }
  });
};

/**
 * Signin after passport authentication
 */
exports.post = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (!user) {
      var message = i18n.t('account.error.' + (info.result || 'unknown'));
      req.flash('signinMessage', message);
      res.redirect('/signin');
    } else if (err) {
      req.flash('signinMessage', i18n.t('account.error.unknown'));
      res.redirect('/signin');
    } else {
      // Remove sensitive data before login
      user.password = undefined;
      user.salt = undefined;

      req.login(user, function (err) {
        if (err) {
          req.flash('signinMessage', i18n.t('account.error.unknown'));
          res.redirect('/signin');
        } else {
          return require('../go-callback')(req, res, next);
        }
      });
    }
  })(req, res, next);
};