'use strict';

var baseConfig = require('./wdio.conf.js').config;

// ============
// Capabilities
// ============
baseConfig.capabilities = [{
  browserName: 'chrome'
}];

// ===================
// Test Configurations
// ===================

// run only work in progress tags
baseConfig.cucumberOpts.tags = ['@wip', '~@ignore'];

module.exports.config = baseConfig;
