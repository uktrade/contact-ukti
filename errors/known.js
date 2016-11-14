'use strict';
var path = require('path');
var hof = require('hof');
var i18n = hof.i18n({
  path: path.resolve(__dirname, '../apps/common/translations/__lng__/__ns__.json')
});
var config = require('../config');
var logger = require('../lib/logger');

/* eslint-disable no-unused-vars */
module.exports = function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  var content = {};

  if (err.code === 'SESSION_TIMEOUT') {

    content.title = i18n.translate('errors.session.title');
    content.message = i18n.translate('errors.session.message');

  } else if (err.code === 'NO_COOKIES') {

    err.status = 403;
    content.title = i18n.translate('errors.cookies-required.title');
    content.message = i18n.translate('errors.cookies-required.message');
  }

  if (content.title) {

    err.template = 'error';

    res.statusCode = err.status || 500;

    logger.error(err.message || err.error, err);
    res.render(err.template, {
      error: err,
      content: content,
      showStack: config.env === 'development',
      startLink: req.path.replace(/^\/([^\/]*).*$/, '$1')
    });

  } else {

    next(err);
  }
};
