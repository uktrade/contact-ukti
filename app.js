'use strict';

var express = require('express');
var app = express();
var path = require('path');
var logger = require('./lib/logger');
var auth = require('./lib/basic-auth');
var churchill = require('churchill');
var raven = require('raven');
var session = require('express-session');
var MemcachedStore = require('connect-memjs')(session);
var config = require('./config');
require('moment-business');

// sentry error monitoring
app.use(raven.middleware.express.requestHandler(config.sentry.dsn));

/*************************************/
/* Basic Authentication              */
/*************************************/
if (config.auth.use === 'true') {
  app.use(auth());
}

if (config.env !== 'ci') {
  app.use(churchill(logger));
}

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(function setAssetPath(req, res, next) {
  res.locals.assetPath = '/public';
  next();
});

require('hof').template.setup(app);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, './apps/common/views'));
app.enable('view cache');
app.use(require('express-partial-templates')(app));
app.engine('html', require('hogan-express-strict'));

app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('body-parser').json());
// pass locals to views
app.use(function setViewLocals(req, res, next) {
  res.locals.baseUrl = req.baseUrl;
  res.locals.trackingId = config.trackingId;
  res.locals.feedbackEmail = config.feedbackEmail;
  next();
});

/*************************************/
/* Memcached session storage         */
/*************************************/

var memcachedStore = new MemcachedStore({
  servers: [config.memcached.hosts],
  username: config.memcached.username,
  password: config.memcached.password,
});

app.use(require('cookie-parser')(config.session.secret));
app.use(function secureCookies(req, res, next) {
  var cookie = res.cookie.bind(res);
  res.cookie = function cookieHandler(name, value, options) {
    options = options || {};
    options.secure = (config.env === 'development' || config.env === 'ci') ? false : true;
    options.httpOnly = true;
    options.path = '/';
    cookie(name, value, options);
  };
  next();
});
app.use(session({
  store: memcachedStore,
  proxy: (config.env === 'development' || config.env === 'ci') ? false : true,
  cookie: {
    secure: (config.env === 'development' || config.env === 'ci') ? false : true,
    maxAge: config.session.ttl
  },
  key: 'ukticontact.sid',
  secret: config.session.secret,
  resave: true,
  saveUninitialized: true
}));

// redirect base root to enquiry app
app.get('/', function rootRedirect(req, res) {
  res.redirect('/enquiry');
});

// apps
app.use('/enquiry', require('./apps/contact-ukti/'));

// static routes
app.get('/cookies', function renderCookies(req, res) {
  res.render('cookies');
});
app.get('/terms-and-conditions', function renderTerms(req, res) {
  res.render('terms');
});

// errors
app.use(raven.middleware.express.errorHandler(config.sentry.dsn));
app.use(require('./errors/page-not-found'));
app.use(require('./errors/'));

app.listen(config.port, config.listenHost);
logger.info('App listening on port', config.port);
