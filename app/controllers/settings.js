/* jshint node:true */
'use strict';

var config = require('../../config/config');
var errorHandler = require('../error-handler');
var i18n = require('i18next');
var User = require('../clients/user');

exports.profile = function (req, res, next) {
  User.getById(req.user.id, function (err, user) {
    res.render('settings/profile', {
      user: user,
      homepageUrl: config.get('sitegateClient.domain') +
        config.get('sitegateClient.privateHomepage'),
      messages: {
        success: req.flash('profileSuccessMessages')
      }
    });
  });
};

exports.updateProfile = function (req, res, next) {
  var userToReturn = {
    username: req.body['user.username'],
    email: req.body['user.email']
  };
  User.update(req.user.id, {
    username: req.body['user.username'],
    email: req.body['user.email']
  }, function (err, user, info) {
    if (err) {
      res.render('settings/profile', {
        user: userToReturn,
        messages: {
          error: errorHandler.getErrorMessage(err)
        }
      });
    } else {
      req.login(user, function (err) {
        if (err) {
          return res.render('settings/profile', {
            user: userToReturn,
            messages: {
              error: errorHandler.getErrorMessage(err)
            }
          });
        }
        return res.render('settings/profile', {
          user: userToReturn,
          messages: {
            success: 'Profile was updated' + (info.emailHasBeenUpdated ? 'Verification email was sent' : '')
          }
        });
      });
    }
  });
};

exports.accounts = function (req, res, next) {
  User.getById(req.user.id, function (err, user) {
    res.render('settings/accounts', {
      title: i18n.t('settings.socialConnections'),
      homepageUrl: config.get('sitegateClient.domain') +
        config.get('sitegateClient.privateHomepage'),
      user: user
    });
  });
};

function renderPasswordPage(req, res, locals) {
  locals = locals || {};

  User.getById(req.user.id, function (err, user) {
    res.render('settings/password', {
      title: 'Generator-Express MVC',
      hasPassword: typeof user.hash !== 'undefined',
      homepageUrl: config.get('sitegateClient.domain') +
        config.get('sitegateClient.privateHomepage'),
      messages: locals.messages
    });
  });
}

exports.password = function (req, res, next) {
  renderPasswordPage(req, res);
};

exports.changePassword = function (req, res) {
  // Init Variables
  var passwordDetails = req.body;

  if (!req.user) {
    return res.status(400).send({
      message: 'User is not signed in'
    });
  }

  if (!passwordDetails.newPassword) {
    return res.status(400).send({
      message: 'Please provide a new password'
    });
  }

  if (passwordDetails.newPassword !== passwordDetails.verifyPassword) {
    return res.status(400).send({
      message: i18n.t('account.password.passwordsDoNotMatch')
    });
  }

  User.changePassword({
    userId: req.user.id,
    currentPassword: passwordDetails.currentPassword,
    newPassword: passwordDetails.newPassword
  }, function (err, user) {
    if (err) {
      return renderPasswordPage(req, res, {
        messages: {
          error: req.i18n.t('account.error.' + err.type || 'unknown')
        }
      });
    }

    req.login(user, function (err) {
      if (err) {
        return res.status(400).send(err);
      }
      return renderPasswordPage(req, res, {
        messages: {
          success: req.i18n.t('settings.passwordChangedSuccessfully')
        }
      });
    });
  });
};

exports.resendEmailVerification = function (req, res) {
  User.sendVerificationEmail(req.user.id, function (err) {
    if (err) {
      return res.status(400);
    }

    return res.status(200).send({
      message: 'Verification has been sent out'
    });
  });
};