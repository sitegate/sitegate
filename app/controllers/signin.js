var express = require('express'),
  mongoose = require('mongoose'),
  passport = require('passport');

exports.get = function (req, res, next) {
    res.render('signin', {
      title: 'Generator-Express MVC'
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
        } else if (req.session.callbackUrl) {
          var callbackUrl = req.session.callbackUrl;
          req.session.callbackUrl = null;
          res.redirect(callbackUrl + '?token=' + user.token);
        } else {
          res.redirect('/');
        }
      });
    }
  })(req, res, next);
};