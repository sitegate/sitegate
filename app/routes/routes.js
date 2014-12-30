'use strict';

/**
 * Module dependencies.
 */
var signin = require('../controllers/signin'),
	signup = require('../controllers/signup');

module.exports = function(app) {
	app.route('/')
		.get(signin.get);

	app.route('/signin')
		.get(signin.get);

	app.route('/signup')
		.get(signup.get);
};