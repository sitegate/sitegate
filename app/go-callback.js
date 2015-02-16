/* jshint node:true */
'use strict';

var crypto = require('crypto'),
  errorHandler = require('./error-handler');

function go(req, res) {
  if (req.session.callbackUrl) {
    var callbackUrl = req.session.callbackUrl;
    req.session.callbackUrl = null;
    return res.redirect(callbackUrl + '?token=' + req.user.token);
  } else {
    return res.redirect('/');
  }
}

module.exports = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  if (req.user.token) {
    return go(req, res);
  }

  req.user.token = crypto.createHash('md5')
    .update(req.user.username + Math.round((new Date().valueOf() * Math.random()))).digest('hex');

  req.user.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      return go(req, res);
    }
  });
};