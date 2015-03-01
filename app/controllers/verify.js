/* jshint node:true */
'use strict';

var User = require('../models/user');
var errorHandler = require('../error-handler');

exports.email = function (req, res, next) {
  User.findOne({
    emailVerificationToken: req.params.token,
    emailVerificationTokenExpires: {
      $gt: Date.now()
    }
  }, function (err, user) {
    if (!err && user) {
      user.emailVerified = true;
      user.emailVerificationToken = null;

      user.save(function (err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          req.login(user, function (err) {
            if (err) {
              res.status(400).send(err);
            } else {
              req.flash('profileSuccessMessages', 'You have successfully verified your email address');
              res.redirect('/settings/profile');
              return;
            }
          });
        }
      });
    } else {
      return res.status(400).send({
        message: 'Email verification token is invalid or has expired.'
      });
    }
  });
};