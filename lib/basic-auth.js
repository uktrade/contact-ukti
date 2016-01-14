'use strict';

var basicAuth = require('basic-auth');
var config = require('../config');

/**
 * Simple basic auth middleware for use with Express 4.x.
 *
 * Based on template found at: http://www.danielstjules.com/2014/08/03/basic-auth-with-express-4/
 *
 * @example
 * app.use('/api-requiring-auth', auth());
 *
 * @returns {function} Express 4 middleware requiring the given credentials
 */
module.exports = function auth() {
  var username = config.auth.user;
  var password = config.auth.pass;

  return function middleware(req, res, next) {

    if (!username || !password) {
      throw new Error('Username or password is not set. Check environment varibles.');
    }

    var user = basicAuth(req);

    if (!user || user.name !== username || user.pass !== password) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.sendStatus(401);
    }

    next();
  };
};
