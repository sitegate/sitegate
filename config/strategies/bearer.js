'use strict';

var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var OAuth = require('../../app/clients/oauth');

module.exports = function() {
  passport.use(new BearerStrategy(OAuth.authToken));
};
