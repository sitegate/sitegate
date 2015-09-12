'use strict';

var login = require('connect-ensure-login');

module.exports = login.ensureLoggedOut();
