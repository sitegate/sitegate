'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('../../app/models/user'),
	i18n = require('i18next');

module.exports = function() {
	// Use local strategy
	passport.use(User.createStrategy());
};