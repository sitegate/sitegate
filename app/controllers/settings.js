/* jshint node:true */
'use strict';

var config = require('../../config/config'),
  User = require('../models/user'),
  errorHandler = require('../error-handler');

exports.profile = function (req, res, next) {
  res.render('settings/profile', {
    user: req.user,
    homepageUrl: config.sitegateClient.domain +
      config.sitegateClient.privateHomepage
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
      user.email = req.body['user.email'];

      user.save(function (err) {
        if (err) {
          res.render('settings/profile', {
            user: userToReturn,
            error: errorHandler.getErrorMessage(err)
          });
        } else {
          req.login(user, function (err) {
            if (err) {
              res.render('settings/profile', {
                user: userToReturn,
                error: errorHandler.getErrorMessage(err)
              });
            } else {
              return res.render('settings/profile', {
                user: userToReturn,
                success: 'Profile was updated'
              });
            }
          });
        }
      });
    } else {
      res.render('settings/profile', {
        user: userToReturn,
        error: 'User is not found'
      })
    }
  });
};

exports.accounts = function (req, res, next) {
  res.render('settings/accounts', {
    title: 'Generator-Express MVC',
    homepageUrl: config.sitegateClient.domain +
      config.sitegateClient.privateHomepage
  });
};

function renderPasswordPage(res, locals) {
  locals = locals || {};

  res.render('settings/password', {
    title: 'Generator-Express MVC',
    homepageUrl: config.sitegateClient.domain +
      config.sitegateClient.privateHomepage,
    success: locals.success,
    message: locals.message
  });
}

exports.password = function (req, res, next) {
  renderPasswordPage(res);
};

exports.changePassword = function (req, res) {
  // Init Variables
  var passwordDetails = req.body;

  if (req.user) {
    if (passwordDetails.newPassword) {
      User.findById(req.user.id, function (err, user) {
        if (!err && user) {
          if (user.authenticate(passwordDetails.currentPassword)) {
            if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
              user.password = passwordDetails.newPassword;

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
                      return renderPasswordPage(res, {
                        success: true,
                        message: req.i18n.t('settings.passwordChangedSuccessfully')
                      });
                    }
                  });
                }
              });
            } else {
              res.status(400).send({
                message: 'Passwords do not match'
              });
            }
          } else {
            return renderPasswordPage(res, {
              success: false,
              message: req.i18n.t('settings.currentPasswordIsIncorrect')
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