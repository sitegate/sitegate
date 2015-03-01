/* jshint node:true */
'use strict';

var passport = require('passport');
var User = require('../app/models/user');
var path = require('path');
var glob = require('glob');

module.exports = function () {
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  // Initialize strategies
  glob.sync('./config/strategies/**/*.js').forEach(function (strategy) {
    require(path.resolve(strategy))();
  });
};