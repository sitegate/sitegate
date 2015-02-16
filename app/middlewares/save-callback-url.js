/* jshint node:true */
'use strict';

module.exports = function (req, res, next) {
  if (req.query.callbackUrl) {
    req.session.callbackUrl = req.query.callbackUrl;
  }

  return next();
};