exports.get = function (req, res, next) {
    res.render('home', {
      title: 'Generator-Express MVC'
    });
};