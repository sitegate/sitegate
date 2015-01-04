exports.get = function (req, res, next) {
    res.render('reset-password', {
      title: req.i18n.t('account.resetPassword')
    });
};