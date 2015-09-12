'use strict';

var User = require('../app/clients/user');
var rootUsername = 'root';
var rootPassword = 'root';

User.getByUsername(rootUsername, function (err, user) {
  if (!user) {
    var rootUser = {
      username: rootUsername,
      email: 'root.email@your-domain.com',
      emailVerified: true,
      password: rootPassword,
      provider: 'local',
      role: 'admin'
    };
    User.register(rootUser);
  }
});
