'use strict';

/**
 * Module dependencies.
 */
var home = require('../controllers/home'),
	signin = require('../controllers/signin'),
	signup = require('../controllers/signup'),
	signout = require('../controllers/signout'),
	users = require('../controllers/users'),
	userInfo = require('../controllers/user-info'),
	settings = require('../controllers/settings'),
	resetPassword = require('../controllers/reset-password'),
	passport = require('passport'),
	isAuthenticated = require('../middlewares/is-authenticated'),
	isGuest = require('../middlewares/is-guest'),
	saveCallbackUrl = require('../middlewares/save-callback-url');

module.exports = function(app) {
	app.use(saveCallbackUrl);

	app.use(function(req, res, next) {
	  res.locals.url = req.url;
	  next();
	});

	app.use('/signout', isAuthenticated);
	app.use('/settings', isAuthenticated);
	app.use('/signin', isGuest);
	app.use('/signup', isGuest);
	app.use('/reset-password', isGuest);

	app.route('/')
		.get(isAuthenticated, home.get);

	app.route('/signin')
		.get(signin.get)
		.post(signin.post);

	app.route('/signup')
		.get(signup.get)
		.post(signup.post);

	app.route('/signout')
		.get(signout.get);

	app.route('/settings')
		.get(settings.profile)
		.post(settings.updateProfile);

	app.route('/settings/profile')
		.get(settings.profile)
		.post(settings.updateProfile);

	app.route('/settings/accounts')
		.get(settings.accounts);

	app.route('/settings/password')
		.get(settings.password)
		.post(settings.changePassword);

	app.route('/reset-password')
		.get(resetPassword.get);

	app.route('/api/user-info')
		.get(userInfo.get);

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