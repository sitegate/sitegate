'use strict';

var passport = require('passport');

exports.isClientAuthenticated = passport.authenticate(['basic', 'oauth2-client-password'], { session: false });
