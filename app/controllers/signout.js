/* jshint node:true */
'use strict';

exports.get = function (req, res, next) {
  req.logout();
  if (req.session.callbackUrl) {
    var callbackUrl = req.session.callbackUrl;
    req.session.callbackUrl = null;
    return res.redirect(callbackUrl);
  }
  res.redirect('/signin');
};