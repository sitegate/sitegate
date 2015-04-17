'use strict';

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var helmet = require('helmet');
var passport = require('passport');
var glob = require('glob');
var compress = require('compression');
var config = require('./config');
var i18n = require('i18next');
var flash = require('connect-flash');
var redirect = require('express-redirect');
var path = require('path');
var rootPath = path.normalize(__dirname + '/..');
var bograch = require('bograch');
var BograchStore = require('connect-bograch')(session, bograch);

// Initialize express app
var app = express();

redirect(app);

// Globbing model files
var models = glob.sync(rootPath + '/app/models/**/*.js');
models.forEach(function (model) {
  require(model);
});

app.set('views', rootPath + '/app/views');
app.set('view engine', 'jade');

app.locals.appTitle = config.get('app.title');

// Registering i18n
i18n.init({
  fallbackLng: 'en',
  ignoreRoutes: ['images/', 'public/', 'css/', 'js/'],
  debug: true,
  resGetPath: path.resolve(__dirname, '..') + '/locales/__lng__/__ns__.json'
});
i18n.registerAppHelper(app);
i18n.addPostProcessor('jade', function (val, key, opts) {
  return require('jade').compile(val, opts)();
});

// app.use(favicon(rootPath + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(i18n.handle);
app.use(methodOverride());

// Static directory should be above session
app.use(compress());
app.use(express.static(rootPath + '/public'));

// CookieParser should be above session
app.use(cookieParser());

// Express Bograch session storage
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: config.get('session.secret'),
  store: new BograchStore('amqp', {
    amqpURL: config.get('amqpUrl')
  })
}));

// use passport session
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session

// Use helmet to secure Express headers
app.use(helmet.xframe());
app.use(helmet.xssFilter());
app.use(helmet.nosniff());
app.use(helmet.ienoopen());
app.disable('x-powered-by');

var routes = glob.sync(rootPath + '/app/routes/*.js');
routes.forEach(function (route) {
  require(route)(app);
});

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      title: 'error'
    });
  });
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    title: 'error'
  });
});

module.exports = app;