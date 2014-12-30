'use strict';

/**
 * Module dependencies.
 */
var signin = require('../controllers/signin'),
	signup = require('../controllers/signup'),
	resetPassword = require('../controllers/reset-password');

module.exports = function(app) {
	app.route('/')
		.get(signin.get);

	app.route('/signin')
		.get(signin.get);

	app.route('/signup')
		.get(signup.get);

	app.route('/reset-password')
		.get(resetPassword.get);
};