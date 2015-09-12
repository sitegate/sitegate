'use strict';

/**
 * Module dependencies.
 */
var home = require('../controllers/home');
var signin = require('../controllers/signin');
var signup = require('../controllers/signup');
var signout = require('../controllers/signout');
var users = require('../controllers/users');
var userInfo = require('../controllers/user-info');
var settings = require('../controllers/settings');
var verify = require('../controllers/verify');
var resetPassword = require('../controllers/reset-password');
var passport = require('passport');
var isAuthenticated = require('../middlewares/is-authenticated');
var isGuest = require('../middlewares/is-guest');
var oauth2Controller = require('../controllers/oauth2');
var authController = require('../controllers/auth');
var applications = require('../controllers/applications');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.locals.url = req.url;
    next();
  });

  app.use('/signout', isAuthenticated);
  app.use('/settings', isAuthenticated);
  app.use('/signin', isGuest);
  app.use('/signup', isGuest);
  app.use('/reset-password', isGuest);

  app.route('/')
    .get(isAuthenticated, home.get);

  app.route('/signin')
    .get(signin.get)
    .post(signin.post);

  app.route('/signup')
    .get(signup.get)
    .post(signup.post);

  app.route('/signout')
    .get(signout.get);

  app.redirect('/settings', '/settings/profile');

  app.route('/settings/profile')
    .get(settings.profile)
    .post(settings.updateProfile);

  app.route('/settings/accounts')
    .get(settings.accounts);

  app.route('/settings/password')
    .get(settings.password)
    .post(settings.changePassword);

  app.route('/settings/applications')
    .get(applications.applications);

  app.route('/settings/applications/new')
    .get(applications.getNewApplication)
    .post(applications.postNewApplication);

  app.route('/settings/applications/revoke/:id')
    .post(applications.postRevoke);

  app.route('/settings/applications/revoke-all')
    .post(applications.postRevokeAll);

  app.route('/settings/applications/:id')
    .get(applications.getApplication)
    .post(applications.postApplication)
    .delete(applications.deleteApplication);

  app.route('/settings/connections/:id')
    .get(applications.getConnection);

  app.route('/reset-password')
    .get(resetPassword.get)
    .post(resetPassword.post);

  app.route('/reset/:token')
    .get(resetPassword.validateResetToken)
    .post(resetPassword.newPassword);

  app.route('/verify-email/:token').get(verify.email);

  app.route('/resend-email-verification')
    .post(isAuthenticated, settings.resendEmailVerification);

  // Setting the facebook oauth routes
  app.route('/auth/facebook').get(passport.authenticate('facebook', {
    scope: ['email']
  }));
  app.route('/auth/facebook/callback').get(users.oauthCallback('facebook'));
  app.route('/auth/facebook/disconnect')
    .get(isAuthenticated, users.disconnect('facebook'));

  // Setting the twitter oauth routes
  app.route('/auth/twitter').get(passport.authenticate('twitter'));
  app.route('/auth/twitter/callback').get(users.oauthCallback('twitter'));
  app.route('/auth/twitter/disconnect')
    .get(isAuthenticated, users.disconnect('twitter'));

  // Setting the google oauth routes
  app.route('/auth/google').get(passport.authenticate('google', {
    scope: [
     'https://www.googleapis.com/auth/userinfo.profile',
     'https://www.googleapis.com/auth/userinfo.email'
    ]
  }));
  app.route('/auth/google/callback').get(users.oauthCallback('google'));
  app.route('/auth/google/disconnect')
    .get(isAuthenticated, users.disconnect('google'));

  // Create endpoint handlers for oauth2 authorize
  app.route('/oauth2/authorize')
    .get(isAuthenticated, oauth2Controller.authorization)
    .post(isAuthenticated, oauth2Controller.decision);

  // Create endpoint handlers for oauth2 token
  app.route('/oauth2/token')
    .post(authController.isClientAuthenticated, oauth2Controller.token);

  app.route('/api/userinfo')
    .get(passport.authenticate('bearer', {session: false}), userInfo.getUserInfo);
};
