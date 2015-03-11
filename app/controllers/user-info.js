/* jshint node:true */
'use strict';

exports.getUserInfo = function (req, res, next) {
  res.json({
    id: req.user._id,
    username: req.user.username,
    email: req.user.email
  });
};