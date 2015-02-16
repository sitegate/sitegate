/* jshint node:true */
'use strict';

module.exports = function isGuest(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }

  require('../go-callback')(req, res, next);
};