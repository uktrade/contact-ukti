'use strict';

var config = require('../config');
var timestamp = new Date().getTime();

module.exports = function locals(req, res, next) {
  res.locals.baseUrl = req.baseUrl;
  res.locals.trackingId = config.trackingId;
  res.locals.feedbackEmail = config.feedbackEmail;
  res.locals.releaseVersion = config.release || timestamp;
  res.locals.assetPath = '/public';
  next();
};
