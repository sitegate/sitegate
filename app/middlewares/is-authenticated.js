module.exports = function isAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/signin');
};