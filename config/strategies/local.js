'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('mongoose').model('User'),
	i18n = require('i18next');

module.exports = function() {
	// Use local strategy
	passport.use(new LocalStrategy({
			usernameField: 'username',
			passwordField: 'password'
		},
		function(username, password, done) {
			User.findOne({
				username: username
			}, function(err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, {
						message: i18n.t('account.invalidUsername')
					});
				}
				if (!user.authenticate(password)) {
					return done(null, false, {
						message: i18n.t('account.invalidPassword')
					});
				}

				return done(null, user);
			});
		}
	));
};