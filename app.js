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
  { register: require('hapi-auth-cookie') },
  { register: require('bell') },
  {
    register: require('./app/plugins/auth/auth'),
    options: {
      facebook: config.get('provider.facebook'),
      google: config.get('provider.google'),
      session: config.get('session'),
      sessionService: require('./app/clients/session')
    }
  },
  { register: require('./app/web/signin') }
], function(err) {
  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
      reply('Hello!');
    }
  });

  server.route({
    method: 'GET',
    path: '/secret',
    config: {
      auth: 'session',
      handler: function(request, reply) {
        reply('secret!');
      }
    }
  });

  server.start(function() {
    console.log('Server running at:', server.info.uri);
  });
});
