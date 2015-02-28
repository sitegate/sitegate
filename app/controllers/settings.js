/* jshint node:true */
'use strict';

var config = require('../../config/config'),
  User = require('../models/user'),
  errorHandler = require('../error-handler'),
  i18n = require('i18next'),
  sendVerificationEmail = require('../send-verification-email');

exports.profile = function (req, res, next) {
  res.render('settings/profile', {
    user: req.user,
    homepageUrl: config.sitegateClient.domain +
      config.sitegateClient.privateHomepage,
    messages: {
      success: req.flash('profileSuccessMessages')
    }
  });
};

exports.updateProfile = function (req, res, next) {
  var userToReturn = {
    username: req.body['user.username'],
    email: req.body['user.email']
  };
  User.findById(req.user.id, function (err, user) {
    if (!err && user) {
      user.username = req.body['user.username'];

      var newEmail = req.body['user.email'] ? req.body['user.email'].toLowerCase() : null;
      var emailHasBeenUpdated = newEmail && (newEmail !== user.email);

      user.email = newEmail;
      if (emailHasBeenUpdated) {
        user.emailVerified = false;
      }

      user.save(function (err) {
        if (err) {
          res.render('settings/profile', {
            user: userToReturn,
            messages: {
              error: errorHandler.getErrorMessage(err)
            }
          });
        } else {
          if (emailHasBeenUpdated) {
            sendVerificationEmail(req, user);
          }
          req.login(user, function (err) {
            if (err) {
              res.render('settings/profile', {
                user: userToReturn,
                messages: {
                  error: errorHandler.getErrorMessage(err)
                }
              });
            } else {
              return res.render('settings/profile', {
                user: userToReturn,
                messages: {
                  success: 'Profile was updated' + (emailHasBeenUpdated ? 'Verification email was sent' : '')
                }
              });
            }
          });
        }
      });
    } else {
      res.render('settings/profile', {
        user: userToReturn,
        messages: {
          error: 'User is not found'
        }
      });
    }
  });
};

exports.accounts = function (req, res, next) {
  res.render('settings/accounts', {
    title: i18n.t('settings.socialConnections'),
    homepageUrl: config.sitegateClient.domain +
      config.sitegateClient.privateHomepage,
    user: req.user
  });
};

function renderPasswordPage(req, res, locals) {
  locals = locals || {};

  res.render('settings/password', {
    title: 'Generator-Express MVC',
    hasPassword: typeof req.user.hash !== 'undefined',
    homepageUrl: config.sitegateClient.domain +
      config.sitegateClient.privateHomepage,
    messages: locals.messages
  });
}

exports.password = function (req, res, next) {
  renderPasswordPage(req, res);
};

function saveNewPassword(req, res, passwordDetails, err, user, info) {
  if (!err && user) {
    if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
      user.setPassword(passwordDetails.newPassword, function (err, user) {
        if (err) {
          return renderPasswordPage(req, res, {
            messages: {
              error: 'Error during changing password'
            }
          });
        }

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
                return renderPasswordPage(req, res, {
                  messages: {
                    success: req.i18n.t('settings.passwordChangedSuccessfully')
                  }
                });
              }
            });
          }
        });
      });
    } else {
      res.status(400).send({
        message: 'Passwords do not match'
      });
    }
  } else {
    return renderPasswordPage(req, res, {
      messages: {
        error: req.i18n.t('settings.currentPasswordIsIncorrect')
      }
    });
  }
}

exports.changePassword = function (req, res) {
  // Init Variables
  var passwordDetails = req.body;

  if (req.user) {
    if (passwordDetails.newPassword) {
      User.findById(req.user.id, function (err, user) {
        if (!err && user) {
          if (typeof user.hash === 'undefined') {
            saveNewPassword(req, res, passwordDetails, err, user);
          } else {
            user.authenticate(passwordDetails.currentPassword, function (err, user, info) {
              saveNewPassword(req, res, passwordDetails, err, user, info);
            });
          }
        } else {
          res.status(400).send({
            message: 'User is not found'
          });
        }
      });
    } else {
      res.status(400).send({
        message: 'Please provide a new password'
      });
    }
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
};

exports.resendEmailVerification = function (req, res) {
  sendVerificationEmail(req, req.user);

  res.status(200).send({
    message: 'Verification has been sent out'
  });
};