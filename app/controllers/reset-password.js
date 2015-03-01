/* jshint node:true */
'use strict';

var User = require('../models/user');
var errorHandler = require('../error-handler');
var i18n = require('i18next');
var crypto = require('crypto');
var sendEmail = require('../send-email');
var config = require('../../config/config');

var ONE_HOUR = 3600000;

function renderResetPassword(res, locals) {
  locals = locals || {};
  locals.title = i18n.t('account.password.reset');
  res.render('reset-password', locals);
}

function sendPasswordResetEmail(req, user) {
  crypto.randomBytes(20, function (err, buffer) {
    var token = buffer.toString('hex');

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + ONE_HOUR;

    user.save(function (err, user) {
      if (!err && user) {
        sendEmail({
          templateName: 'reset-password-email',
          to: user.email,
          subject: i18n.t('email.resetPassword.subject'),
          locals: {
            username: user.username,
            url: 'http://' + req.headers.host +
              '/reset/' + user.resetPasswordToken,
            siteName: config.app.title
          }
        });
      }
    });
  });
}

exports.get = function (req, res, next) {
  renderResetPassword(res);
};

exports.post = function (req, res, next) {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) {
      return renderResetPassword(res, {
        messages: {
          error: errorHandler.getErrorMessage(err)
        }
      });
    }

    if (!user) {
      return renderResetPassword(res, {
        messages: {
          error: 'There is no user with such email in our system'
        }
      });
    }

    sendPasswordResetEmail(req, user);

    return renderResetPassword(res, {
      messages: {
        success: i18n.t('account.password.emailSent', {
          email: user.email
        })
      }
    });
  });
};

exports.validateResetToken = function (req, res) {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {
      $gt: Date.now()
    }
  }, function (err, user) {
    if (err || !user) {
      renderResetPassword(res, {
        messages: {
          error: i18n.t('account.password.invalidResetToken')
        }
      });
      return;
    }

    res.render('password/new');
  });
};

exports.newPassword = function (req, res) {
  var passwordDetails = req.body;

  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {
      $gt: Date.now()
    }
  }, function (err, user) {
    if (err || !user) {
      return renderResetPassword(res, {
        messages: {
          error: i18n.t('account.password.invalidResetToken')
        }
      });
    }

    if (passwordDetails.newPassword === passwordDetails.repeatPassword) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      user.setPassword(passwordDetails.newPassword, function (err, user) {
        if (err || !user) {
          res.render('password/new', {
            messages: {
              error: i18n.t('account.password.unknownError')
            }
          });
          return;
        }

        user.save(function (err) {
          if (err) {
            return res.render('password/new', {
              messages: {
                error: i18n.t('account.password.unknownError')
              }
            });
          }
          req.login(user, function (err) {
            if (err) {
              return res.render('password/new', {
                messages: {
                  error: errorHandler.getErrorMessage(err)
                }
              });
            } else {
              sendEmail({
                templateName: 'reset-password-confirm-email',
                to: user.email,
                subject: i18n.t('email.resetPasswordConfirm.subject'),
                locals: {
                  username: user.username
                }
              });

              return res.redirect('/');
            }
          });
        });
      });
    } else {
      res.render('password/new', {
        messages: {
          error: i18n.t('account.password.passwordsDoNotMatch')
        }
      });
    }
  });
};