var config = require('../../config/config');

exports.profile = function (req, res, next) {
    res.render('settings/profile', {
      username: req.user.username,
      email: req.user.email,
      homepageUrl: config.sitegateClient.domain + config.sitegateClient.privateHomepage
    });
};

exports.updateProfile = function (req, res, next) {
	throw 'Not implemented yet!';
};

exports.accounts = function (req, res, next) {
    res.render('settings/accounts', {
      title: 'Generator-Express MVC',
      homepageUrl: config.sitegateClient.domain + config.sitegateClient.privateHomepage
    });
};

exports.password = function (req, res, next) {
    res.render('settings/password', {
      title: 'Generator-Express MVC',
      homepageUrl: config.sitegateClient.domain + config.sitegateClient.privateHomepage
    });
};