/* jshint node:true */
'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');
var User = require('../../app/models/user');

module.exports = function () {
  // Use local strategy
  passport.use(User.createStrategy());
};