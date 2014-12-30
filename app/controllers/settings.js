exports.profile = function (req, res, next) {
    res.render('settings/profile', {
      username: req.user.username,
      email: req.user.email
    });
};

exports.updateProfile = function (req, res, next) {
	throw 'Not implemented yet!';
};

exports.accounts = function (req, res, next) {
    res.render('settings/accounts', {
      title: 'Generator-Express MVC'
    });
};

exports.password = function (req, res, next) {
    res.render('settings/password', {
      title: 'Generator-Express MVC'
    });
};