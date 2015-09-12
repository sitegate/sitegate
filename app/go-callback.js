'use strict';

var errorHandler = require('./error-handler');

function go(req, res) {
  if (req.session.returnTo) {
    var returnTo = req.session.returnTo;
    req.session.returnTo = null;
    return res.redirect(returnTo);
  }
  return res.redirect('/');
}

module.exports = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  return go(req, res);
};
