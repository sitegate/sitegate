var express = require('express'),
  mongoose = require('mongoose'),
  passport = require('passport');

exports.get = function (req, res, next) {
    res.render('signin', {
      title: req.i18n.t('account.signIn')
    });
};

/**
 * Signin after passport authentication
 */
exports.post = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err || !user) {
      res.status(400).send(info);
    } else {
      // Remove sensitive data before login
      user.password = undefined;
      user.salt = undefined;

      req.login(user, function(err) {
        if (err) {
          res.status(400).send(err);
        } else {
          return require('../go-callback')(req, res, next);
        }
      });
    }
  })(req, res, next);
};