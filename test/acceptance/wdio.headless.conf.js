'use strict';

var baseConfig = require('./wdio.conf.js').config;

// ============
// Capabilities
// ============
baseConfig.capabilities = [{
  browserName: 'phantomjs'
}];

module.exports.config = baseConfig;
