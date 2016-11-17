'use strict';

var express = require('express');
var app = express();
var path = require('path');
var logger = require('./lib/logger');
var auth = require('./lib/basic-auth');
var config = require('./config');
var churchill = require('churchill');
var raven = require('raven');
var ravenClient = new raven.Client(config.sentry.dsn, {release: config.release});
var session = require('express-session');
var url = require('url');
var redis = require('redis');
var RedisStore = require('connect-redis-crypto')(session);
var companiesHouse = require('./lib/companies-house');

require('moment-business');

// sentry error monitoring
app.use(raven.middleware.express.requestHandler(ravenClient));

/*************************************/
/* Force Https                       */
/*************************************/

app.use(function forceSSL(req, res, next) {
  var FORCE_HTTPS = (config.env === 'development' || config.env === 'ci') ? false : true;
  if (req.headers['x-forwarded-proto'] !== 'https' && FORCE_HTTPS) {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  next();
});


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

require('hof').template.setup(app);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, './apps/common/views'));
app.enable('view cache');
app.use(require('express-partial-templates')(app));
app.engine('html', require('hogan-express-strict'));

app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('body-parser').json());

// Insert usefull variables into response for all controllers
app.use(require('./middleware/locals'));

/*************************************/
/* Redis session storage             */
/*************************************/
var client;


if (config.redis.url) {
  var redisURL = url.parse(config.redis.url);
  /* eslint-disable camelcase */
  client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
  /* eslint-enable camelcase */
  client.auth(redisURL.auth.split(':')[1]);
} else {
  client = redis.createClient(config.redis.port, config.redis.host);
}

client.on('error', function clientErrorHandler(e) {
  logger.error('Error to connecting to redis');
  logger.error(e);
  throw e;
});

client.on('connect', function() {
  logger.info('connected to redis');
});

client.on('ready', function() {
  logger.info('connection to redis is ready to use');
  companiesHouse.setRedisClient(client);
});

var redisStore = new RedisStore({
  client: client,
  // config ttl defined in milliseconds
  ttl: config.session.ttl / 1000,
  secret: config.session.secret,
  logErrors: logger.error
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
  store: redisStore,
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

// use the hof middleware
app.use(require('hof').middleware());

// redirect base root to enquiry app
app.get('/', function rootRedirect(req, res) {
  res.redirect('/enquiry');
});

// Legacy application redirects
function redirectEnquiry(req, res) {
  res.redirect('/enquiry');
}
function redirectOfficeFinder(req, res) {
  res.redirect('/office-finder');
}
app.get('/:lang?/uktihome/:type?/contactus/*contactusform.html', redirectEnquiry);
app.get('*contactusform/thankyou.html', redirectEnquiry);
app.get('*contactSearch.html', redirectOfficeFinder);
app.get('*doContactRegionSearch.html', redirectOfficeFinder);

// apps
app.use('/enquiry', require('./apps/contact-ukti/'));
app.use('/office-finder', require('./apps/office-finder/'));

// static routes
app.get('/cookies', function renderCookies(req, res) {
  res.render('cookies');
});
app.get('/terms-and-conditions', function renderTerms(req, res) {
  res.render('terms');
});

// errors
app.use(require('./errors/known'));
app.use(raven.middleware.express.errorHandler(ravenClient));
app.use(require('./errors/unknown'));
app.use(require('./errors/page-not-found'));

app.listen(config.port, config.listenHost, function appStarted(err) {
  if (err) {
    logger.error(err);
  } else {
    logger.info('App listening on port', config.port);
  }
});
