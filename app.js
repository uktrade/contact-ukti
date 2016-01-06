var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var sassMiddleware = require('node-sass-middleware');
var mojularSassPaths = require('mojular/sass-paths');

var index = require('./routes/index');
var enquiryForm = require('./routes/enquiry-form');

var app = express();

var loadPaths = mojularSassPaths([
  require('mojular-govuk-elements/package.json'),
  require('mojular-moj-elements/package.json')
]);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// locals
app.locals.S = require('string');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(sassMiddleware({
  src: path.join(__dirname, 'public', 'sass'),
  dest: path.join(__dirname, 'public', 'stylesheets'),
  prefix: '/stylesheets',
  sourceMap: true,
  includePaths: loadPaths
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/enquire', enquiryForm);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
