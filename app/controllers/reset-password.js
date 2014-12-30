exports.get = function (req, res, next) {
    res.render('reset-password', {
      title: 'Generator-Express MVC'
    });
};