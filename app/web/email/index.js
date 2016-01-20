'use strict'
module.exports = (server, options) => {
  let userService = server.plugins.jimboClient.user

  server.route({
    method: 'GET',
    path: '/verify-email/:token',
    handler (req, res) {
      userService.verifyEmailByToken({ token: req.params.token }, (err, user) => {
        if (err) {
          return res.status(400).send({
            message: 'Email verification token is invalid or has expired.',
          })
        }

        req.login({ id: user.id }, err => {
          if (err) {
            return res.status(400).send(err)
          }

          req.flash('profileSuccessMessages',
            'You have successfully verified your email address')
          res.redirect('/settings/profile')
        })
      })
    },
  })
}

module.exports.attributes = {
  name: 'web/email',
}
