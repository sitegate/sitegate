'use strict';

exports.get = function (req, res, next) {
	req.logout();
	res.redirect('/signin');
};