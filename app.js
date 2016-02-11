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
/******* Basic Authentication ********/
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

app.use(function setBaseUrl(req, res, next) {
  res.locals.baseUrl = req.baseUrl;
  next();
});

// pass tracking id to template
app.locals.trackingId = config.trackingId;
app.locals.feedbackEmail = config.feedbackEmail;

/*************************************/
/***** Memcached session storage *****/
/*************************************/

var memcachedStore = new MemcachedStore({
  servers: [config.memcached.hosts],
  username: config.memcached.username,
  password: config.memcached.password,
});

function secureCookies(req, res, next) {
  var cookie = res.cookie.bind(res);
  res.cookie = function cookieHandler(name, value, options) {
    options = options || {};
    options.secure = (req.protocol === 'https');
    options.httpOnly = true;
    options.path = '/';
    cookie(name, value, options);
  };
  next();
}
function initSession(req, res, next) {
  session({
    store: memcachedStore,
    cookie: {
      secure: (req.protocol === 'https'),
      maxAge: config.session.ttl
    },
    key: 'ukticontact.sid',
    secret: config.session.secret,
    resave: true,
    saveUninitialized: true
  })(req, res, next);
}

app.use(require('cookie-parser')(config.session.secret));
app.use(secureCookies);
app.use(initSession);

// apps
app.use(require('./apps/contact-ukti/'));

app.get('/cookies', function renderCookies(req, res) {
  res.render('cookies');
});
app.get('/terms-and-conditions', function renderTerms(req, res) {
  res.render('terms');
});

// errors
app.use(raven.middleware.express.errorHandler(config.sentry.dsn));
app.use(require('./errors/'));

// prevent event listeners warning
/* eslint-disable no-underscore-dangle */
require('events').EventEmitter.prototype._maxListeners = 0;
/* eslint-enable no-underscore-dangle */

/*eslint camelcase: 0*/
app.listen(config.port, config.listen_host);
/*eslint camelcase: 1*/
logger.info('App listening on port', config.port);
