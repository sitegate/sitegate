module.exports = function isGuest(req, res, next) {
    if (!req.isAuthenticated())
        return next();
    if (req.session.callbackUrl) {
		var callbackUrl = req.session.callbackUrl;
     	req.session.callbackUrl = null;
      	res.redirect(callbackUrl + '?username=' + req.user.username + '&email=' + req.user.email);
    }

    res.redirect('/');
};