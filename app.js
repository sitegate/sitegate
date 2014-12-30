var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var app = express();

require('./config/express')(app, config);

// Bootstrap passport config
require('./config/passport')();

app.listen(config.port);

