var express = require('express'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  methodOverride = require('method-override'),
  cookieParser = require('cookie-parser'),
  helmet = require('helmet'),
  passport = require('passport'),
  MongoStore = require('connect-mongo')(session),
  glob = require('glob'),
  favicon = require('serve-favicon'),
  compress = require('compression'),
  config = require('./config'),
  i18n = require('i18next');

module.exports = function(db) {
  // Initialize express app
  var app = express();

  // Globbing model files
  var models = glob.sync(config.root + '/app/models/**/*.js');
  models.forEach(function (model) {
    require(model);
  });

  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');

  // Registering i18n
  i18n.init({
    fallbackLng: 'en',
    ignoreRoutes: ['images/', 'public/', 'css/', 'js/'],
    debug: true
  });
  i18n.registerAppHelper(app)
  i18n.addPostProcessor("jade", function(val, key, opts) {
   return require("jade").compile(val, opts)();
  });

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(i18n.handle);
  app.use(methodOverride());

  // CookieParser should be above session
  app.use(cookieParser());

  // Express MongoDB session storage
  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret,
    store: new MongoStore({
      mongooseConnection: db.connection,
      collection: config.sessionCollection
    })
  }));

  // use passport session
  app.use(passport.initialize());
  app.use(passport.session());

  // Use helmet to secure Express headers
  app.use(helmet.xframe());
  app.use(helmet.xssFilter());
  app.use(helmet.nosniff());
  app.use(helmet.ienoopen());
  app.disable('x-powered-by');

  app.use(compress());
  app.use(express.static(config.root + '/public'));

  var routes = glob.sync(config.root + '/app/routes/*.js');
  routes.forEach(function (route) {
    require(route)(app);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development'){
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

  return app;
};
