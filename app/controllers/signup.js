'use strict';

/**
 * Module dependencies.
 */
var errorHandler = require('./errors'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');

exports.get = function (req, res, next) {
    res.render('signup', {
      title: req.i18n.t('account.signUp')
    });
};

/**
 * Signup
 */
exports.post = function (req, res, next) {
	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	// Init Variables
	var user = new User(req.body);
	var message = null;

	// Add missing user fields
	user.provider = 'local';
	user.displayName = user.firstName + ' ' + user.lastName;

	// Then save the user 
	user.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			// Remove sensitive data before login
			user.password = undefined;
			user.salt = undefined;

			req.login(user, function(err) {
				if (err) {
					res.status(400).send(err);
				} else {
					return require('../go-callback')(req, res, next);
		        }
			});
		}
	});
};