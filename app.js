'use strict';

var config = require('./config/config');
var https = require('https');
var fs = require('fs');

var app = require('./config/express');

// Bootstrap passport config
require('./config/passport')();

if (config.get('env') === 'development') {
  require('./config/setup-root');
}

//TODO: Change these for your own certificates.  This was generated
//through the commands:
//openssl genrsa -out privatekey.pem 1024
//openssl req -new -key privatekey.pem -out certrequest.csr
//openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem
var options = {
  key: fs.readFileSync(__dirname + '/certs/privatekey.pem'),
  cert: fs.readFileSync(__dirname + '/certs/certificate.pem')
};

// Create our HTTPS server listening on port config.get('port').
https.createServer(options, app).listen(config.get('port'));
