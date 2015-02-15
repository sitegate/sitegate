'use strict';

var passport = require('passport'),
	User = require('../app/models/user'),
	path = require('path'),
	glob = require('glob');

module.exports = function() {
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());

	// Initialize strategies
	glob.sync('./config/strategies/**/*.js').forEach(function(strategy) {
		require(path.resolve(strategy))();
	});
};