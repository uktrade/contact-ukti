'use strict';

/**
 * Configuration overwrites for headless tests
 */
var config = require('./wdio.conf.js').config;

exports.config = (function headlessConfig(globalConfig) {
  globalConfig.capabilities = [{
    browserName: 'chrome'
  }];

  return globalConfig;
}(config));
