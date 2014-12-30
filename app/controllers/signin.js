var express = require('express'),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  passport = require('passport');

exports.get = function (req, res, next) {
  Article.find(function (err, articles) {
    if (err) return next(err);
    res.render('signin', {
      title: 'Generator-Express MVC'
    });
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
          res.send('Successfully signed in');
        }
      });
    }
  })(req, res, next);
};