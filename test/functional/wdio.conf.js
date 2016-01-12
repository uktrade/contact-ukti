'use strict';

var fs = require('fs');
var path = require('path');
var del = require('del');
var Q = require('q');
var request = require('request');
var selenium = require('selenium-standalone');
var ProgressBar = require('progress');
var logger = require('../../lib/logger');
var config = require('../../config');

var screenshotPath = path.join('test', 'functional', 'errorshots');

/**
 * Start a selenium server if it doesn't exist
 *
 * @returns {promise} A deferred promise
 */
function startSelenium() {
  var deferred = Q.defer();
  var statusUrl = 'http://localhost:4444/wd/hub/status';


  request(statusUrl, function checkSelenium(error) {
    if (!error) {
      // already started, return promise
      deferred.resolve('started all good');
    }

    var bar;

    logger.info('Installing selenium standalone');
    selenium.install({
      version: '2.48.0',
      drivers: {
        chrome: {
          version: '2.9'
        }
      },
      progressCb: function seleniumProgress(total, progress, chunk) {
        if (!bar) {
          bar = new ProgressBar('selenium installation [:bar] :percent :etas', {
            total: total,
            complete: '=',
            incomplete: ' ',
            width: 20
          });
        }
        bar.tick(chunk);
      }
    }, function seleniumInstall(installError) {
      if (installError) {
        deferred.reject(installError);
      }

      logger.info('Starting selenium');
      selenium.start(function seleniumStart(startError, child) {
        if (startError) {
          deferred.reject(startError);
        }

        selenium.child = child;
        deferred.resolve();
      });
    });

  });

  return deferred.promise;
}


var wdioConfig = {

  // ==========
  // Test Files
  // ==========
  specs: [
    './test/functional/features/**/*.feature'
  ],

  // ============
  // Capabilities
  // ============
  capabilities: [{
    browserName: 'chrome'
  }, {
    browserName: 'firefox'
  }, {
    browserName: 'phantomjs'
  }],

  // ===================
  // Test Configurations
  // ===================
  logLevel: 'silent',
  screenshotPath: screenshotPath,
  baseUrl: config.webdriver.baseUrl,
  framework: 'cucumber',
  reporter: 'dot',
  cucumberOpts: {
    require: [
      './test/functional/features/steps/**/*.js',
      './test/functional/features/pages/**/*.js',
      './test/functional/features/support/**/*.js'
    ],
    // Enable this config to treat undefined definitions as warnings.
    ignoreUndefinedDefinitions: false,
    // run only certain scenarios annotated by tags
    tags: ['~@ignore']
  },

  // =====
  // Hooks
  // =====
  onPrepare: function wdioOnPrepare() {
    // setup screenshot directory
    del.sync(screenshotPath);
    fs.mkdirSync(screenshotPath);

    // start selenium
    return startSelenium();
  },
  before: function wdioOnBefore() {
    // setup chai-as-promised support
    // http://webdriver.io/guide/testrunner/frameworks.html
    var chai = require('chai');
    var chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);
    chai.Should();
  },
  onComplete: function wdioOnComplete() {
    // shutdown selenium server
    if (selenium.child) {
      selenium.child.kill();
    }
  }

};

module.exports.config = wdioConfig;
