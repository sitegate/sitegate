exports.profile = function (req, res, next) {
    res.render('settings/profile', {
      title: 'Generator-Express MVC'
    });
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