'use strict';

var winston = require('winston');
var config = require('../config');
var loggingTransports = [];
var exceptionTransports = [];

loggingTransports.push(
  new (winston.transports.Console)({
    level: config.logLevel,
    json: false,
    timestamp: true,
    colorize: true
  })
);

if (config.env === 'production') {
  exceptionTransports.push(
    new (winston.transports.Console)({
      json: true,
      timestamp: true,
      colorize: false,
      stringify: function stringify(obj) {
        return JSON.stringify(obj);
      }
    })
  );
}

var winstonConfig = {
  transports: loggingTransports,
  exceptionHandlers: exceptionTransports,
  exitOnError: true
};

var logger = new (winston.Logger)(winstonConfig);
logger.cli();

module.exports = logger;
