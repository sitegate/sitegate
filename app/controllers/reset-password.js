'use strict';

var errorHandler = require('../error-handler');
var i18n = require('i18next');
var config = require('../../config/config');
var User = require('../clients/user');

function renderResetPassword(res, locals) {
  locals = locals || {};
  locals.title = i18n.t('account.password.reset');
  res.render('reset-password', locals);
}

exports.get = function (req, res, next) {
  renderResetPassword(res);
};

exports.post = function (req, res, next) {
  User.requestPasswordChangeByEmail(req.body.email, function (err, info) {
    if (err) {
      return renderResetPassword(res, {
        messages: {
          error: errorHandler.getErrorMessage(err)
        }
      });
    }

    return renderResetPassword(res, {
      messages: {
        success: i18n.t('account.password.emailSent', {
          email: req.body.email
        })
      }
    });
  });
};

exports.validateResetToken = function (req, res) {
  User.validateResetToken(req.params.token, function (err) {
    if (err) {
      return renderResetPassword(res, {
        messages: {
          error: i18n.t('account.password.invalidResetToken')
        }
      });
    }

    res.render('password/new');
  });
};

exports.newPassword = function (req, res) {
  var passwordDetails = req.body;

  if (passwordDetails.newPassword !== passwordDetails.repeatPassword) {
    return res.render('password/new', {
      messages: {
        error: i18n.t('account.password.passwordsDoNotMatch')
      }
    });
  }

  User.changePasswordUsingToken({
    token: req.params.token,
    newPassword: passwordDetails.newPassword
  }, function (err, user) {
    if (err || !user) {
      return renderResetPassword(res, {
        messages: {
          error: i18n.t('account.password.invalidResetToken')
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
      }

      return res.redirect('/');
    });
  });
};
