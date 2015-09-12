'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../app/clients/user');

module.exports = function() {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.authenticate({
        usernameOrEmail: username,
        password: password
      }, done);
    }
  ));
};
