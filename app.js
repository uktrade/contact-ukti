'use strict';

var express = require('express');
var app = express();
var path = require('path');
var logger = require('./lib/logger');
var auth = require('./lib/basic-auth');
var churchill = require('churchill');
var session = require('express-session');
var url = require('url');
var redis = require('redis');
var RedisStore = require('connect-redis-crypto')(session);
var config = require('./config');
require('moment-business');

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

/*************************************/
/******* Redis session storage *******/
/*************************************/
var client;

if (config.redis.url) {
  var redisURL = url.parse(config.redis.url);
  /*eslint-disable camelcase*/
  client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
  /*eslint-enable camelcase*/
  client.auth(redisURL.auth.split(':')[1]);
} else {
  client = redis.createClient(config.redis.port, config.redis.host);
}

client.on('error', function clientErrorHandler(e) {
  throw e;
});

var redisStore = new RedisStore({
  client: client,
  ttl: config.session.ttl,
  secret: config.session.secret
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
    store: redisStore,
    cookie: {
      secure: (req.protocol === 'https')
    },
    key: 'hmbrp.sid',
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
app.use(require('./errors/'));

/*eslint camelcase: 0*/
app.listen(config.port, config.listen_host);
/*eslint camelcase: 1*/
logger.info('App listening on port', config.port);
