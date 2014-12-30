exports.get = function (req, res, next) {
    res.render('signup', {
      title: 'Generator-Express MVC'
    });
};