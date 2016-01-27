'use strict';

var winston = require('winston');
var config = require('../config');
var loggingTransports = [];
var exceptionTransports = [];
var isProd = config.env === 'production';
var logLevel = 'warn';

if (config.env === 'development') {
  logLevel = 'silly';
}

loggingTransports.push(
  new (winston.transports.Console)({
    level: logLevel,
    json: isProd ? true : false,
    timestamp: true,
    colorize: true,
    stringify: function stringify(obj) {
      return JSON.stringify(obj);
    }
  })
);

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

var winstonConfig = {
  transports: loggingTransports,
  exceptionHandlers: exceptionTransports,
  exitOnError: true
};

if (!isProd) {
  delete winstonConfig.exceptionHandlers;
}

var logger = new (winston.Logger)(winstonConfig);
logger.cli();

module.exports = logger;
