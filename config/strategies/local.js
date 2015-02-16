/* jshint node:true */
'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
  User = require('../../app/models/user');

module.exports = function () {
  // Use local strategy
  passport.use(User.createStrategy());
};