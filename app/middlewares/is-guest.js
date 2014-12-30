module.exports = function isGuest(req, res, next) {
    if (!req.isAuthenticated())
        return next();

    res.redirect('/');
};