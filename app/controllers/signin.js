/* jshint node:true */
'use strict';

var passport = require('passport');
var config = require('../../config/config');
var i18n = require('i18next');

function renderSignIn(res, locals) {
  locals = locals || {};
  locals.title = i18n.t('account.signIn');
  locals.cancelUrl = config.sitegateClient.domain + config.sitegateClient.publicHomepage;
  res.render('signin', locals);
}

exports.get = function (req, res, next) {
  renderSignIn(res);
};

/**
 * Signin after passport authentication
 */
exports.post = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (!user) {
      return renderSignIn(res, {
        username: req.body.username,
        password: req.body.password,
        messages: {
          error: i18n.t('account.error.' + (info.result || 'unknown'))
        }
      });
    }
    
    if (err) {
      return renderSignIn(res, {
        username: req.body.username,
        password: req.body.password,
        messages: {
          error: i18n.t('account.error.unknown')
        }
      });
    }
    
    // Remove sensitive data before login
    user.password = undefined;
    user.salt = undefined;

    req.login(user, function (err) {
      if (err) {
        return renderSignIn(res, {
        username: req.body.username,
        password: req.body.password,
          messages: {
            error: i18n.t('account.error.unknown')
          }
        });
      }
      
      return require('../go-callback')(req, res, next);
    });
  })(req, res, next);
};