'use strict';

/*
var config = require('./config/config');
var https = require('https');
var fs = require('fs');

var app = require('./config/express');

// Bootstrap passport config
require('./config/passport')();

if (config.get('env') === 'development') {
  require('./config/setup-root');
}

*/
var config = require('./config/config');
var fs = require('fs');
var Hapi = require('hapi');
var path = require('path');
require('./config/i18n');

//TODO: Change these for your own certificates.  This was generated
//through the commands:
//openssl genrsa -out privatekey.pem 1024
//openssl req -new -key privatekey.pem -out certrequest.csr
//openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem
var tls = {
  key: fs.readFileSync(__dirname + '/certs/privatekey.pem'),
  cert: fs.readFileSync(__dirname + '/certs/certificate.pem')
};

var server = new Hapi.Server();
server.connection({ port: config.get('port'), tls: tls });

server.register([
  // registering microservices
  { register: require('./app/plugins/client') },
  { register: require('./app/plugins/user') },
  { register: require('./app/plugins/session') },
  {
    register: require('humble-session'),
    options: {
      password: config.get('session.secret'),
      cookie: 'sid-sg', // cookie name to use, usually sid-<appname>
      isSecure: true,
      sessionStoreName: 'session'
    }
  },
  { register: require('humble-auth') },

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
  { register: require('hapi-vtree') },
  { register: require('inert') },
  { register: require('./app/web/signin') },
  { register: require('./app/web/home') },
  { register: require('./app/web/public') },
  { register: require('./app/web/settings/profile') },
  { register: require('./app/web/settings/accounts') },
  { register: require('./app/web/settings/password') }
], function(err) {
  if (err) {
    throw err;
  }

/*
  server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
      reply('Hello!');
    }
  });*/

  server.route({
    method: 'GET',
    path: '/secret',
    config: {
      handler: function(request, reply) {
        reply('secret!');
      }
    }
  });

  server.start(function() {
    console.log('Server running at:', server.info.uri);
  });
});
