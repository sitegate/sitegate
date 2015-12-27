'use strict';

process.on('uncaughtException', function(err) {
  console.log('An uncaught exception happened.');
  console.log(err);
});

process.on('unhandledRejection', function(reason, p) {
  console.log('Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});

const config = require('./config/config');
const Hapi = require('hapi');
const path = require('path');
require('./config/i18n');

if (config.get('env') === 'development') {
  require('./config/setup-root');
}

let server = new Hapi.Server();
server.connection({ port: config.get('port') });

server.register([
  // registering microservices
  { register: require('./app/plugins/client') },
  { register: require('./app/plugins/user') },
  { register: require('./app/plugins/session') },
  { register: require('./app/plugins/oauth') },
  {
    register: require('humble-session'),
    options: {
      password: config.get('session.secret'),
      cookie: 'sid-sg', // cookie name to use, usually sid-<appname>
      isSecure: config.get('session.secure'),
      sessionStoreName: 'session'
    }
  },
  { register: require('humble-auth') },
  { register: require('humble-flash') },
  { register: require('hapi-auth-bearer-token') },
  { register: require('hapi-auth-basic') },
  { register: require('hapi-auth-form') },
  { register: require('bell') },
  {
    register: require('./app/plugins/auth/auth'),
    options: {
      facebook: config.get('provider.facebook'),
      google: config.get('provider.google'),
      twitter: config.get('provider.twitter'),
      session: config.get('session')
    }
  },
  { register: require('humble-oauth2orize') },
  { register: require('./app/plugins/oauth2') },
  { register: require('hapi-vtree') },
  { register: require('inert') },
  {
    register: require('./app/web/signin'),
    options: {
      homepageUrl: config.get('app.homepageUrl'),
    },
  },
  {
    register: require('./app/web/signup'),
    options: {
      homepageUrl: config.get('app.homepageUrl'),
    },
  },
  { register: require('./app/web/reset-password') },
  { register: require('./app/web/home') },
  { register: require('./app/web/public') },
  { register: require('./app/web/email') },
  { register: require('./app/web/settings/profile') },
  { register: require('./app/web/settings/accounts') },
  { register: require('./app/web/settings/password') },
  { register: require('./app/web/application') },
  { register: require('./app/web/user-info') },
], function(err) {
  if (err) {
    throw err;
  }

  server.start(function() {
    console.log('Server running at:', server.info.uri);
  });
});
