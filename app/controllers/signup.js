'use strict';

/**
 * Module dependencies.
 */
var errorHandler = require('./errors'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User'),
	crypto = require('crypto');

exports.get = function (req, res, next) {
    res.render('signup', {
      title: 'Generator-Express MVC'
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
	user.token = crypto.createHash('md5').update(user.username + Math.round((new Date().valueOf() * Math.random()))).digest('hex');

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
				} else if (req.session.callbackUrl) {
		          var callbackUrl = req.session.callbackUrl;
		          req.session.callbackUrl = null;
		          res.redirect(callbackUrl + '?token=' + user.token);
		        } else {
		          res.redirect('/');
		        }
			});
		}
	});
};