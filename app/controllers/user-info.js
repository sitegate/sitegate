var mongoose = require('mongoose'),
	User = mongoose.model('User');

exports.get = function (req, res, next) {
	if (!req.query.token) {
		res.status(401).send('Token was not passed');
		return;
	}
	User.findOne({
		token: req.query.token
	}, function(err, user) {
		if (err) return next(err);
		if (!user) return res.status(404).send('No user with the specified token.');
		res.json({
			username: user.username,
			email: user.email
		});
	});
};