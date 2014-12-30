'use strict';

/**
 * Module dependencies.
 */
var signin = require('../controllers/signin'),
	signup = require('../controllers/signup'),
	users = require('../controllers/users'),
	resetPassword = require('../controllers/reset-password'),
	passport = require('passport');

module.exports = function(app) {
	app.route('/')
		.get(signin.get);

	app.route('/signin')
		.get(signin.get)
		.post(signin.post);

	app.route('/signup')
		.get(signup.get)
		.post(signup.post);

	app.route('/reset-password')
		.get(resetPassword.get);

	// Setting the facebook oauth routes
	app.route('/auth/facebook').get(passport.authenticate('facebook', {
		scope: ['email']
	}));
	app.route('/auth/facebook/callback').get(users.oauthCallback('facebook'));

	// Setting the twitter oauth routes
	app.route('/auth/twitter').get(passport.authenticate('twitter'));
	app.route('/auth/twitter/callback').get(users.oauthCallback('twitter'));

	// Setting the google oauth routes
	app.route('/auth/google').get(passport.authenticate('google', {
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		]
	}));
	app.route('/auth/google/callback').get(users.oauthCallback('google'));
};