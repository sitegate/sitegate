/* jshint node:true */
'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.get = function (req, res, next) {
  if (!req.query.token) {
    res.status(401).send('Token was not passed');
    return;
  }
  User.findOne({
    token: req.query.token
  }, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(404).send('No user with the specified token.');
    }
    res.json({
      id: user._id,
      username: user.username,
      email: user.email
    });
  });
};

exports.getUserInfo = function (req, res, next) {
  res.json({
    id: req.user._id,
    username: req.user.username,
    email: req.user.email
  });
};