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

var screenshotPath = path.resolve(__dirname, 'errorshots');

/**
 * Start a selenium server if it doesn't exist
 *
 * @returns {promise} A deferred promise
 */
function startSelenium() {
  var deferred = Q.defer();
  var statusUrl = 'http://localhost:4444/wd/hub/status';
  var drivers = {
      chrome: {
        version: '2.25'
      },
      firefox: {
        version: '0.11.1'
      }
    };

  request(statusUrl, function checkSelenium(error) {
    if (!error) {
      // already started, return promise
      logger.info('Selenium already running');
      deferred.resolve('started all good');
    } else {
      var bar;

      logger.info('Installing selenium standalone');
      selenium.install({
        version: '2.53.1',
        drivers: drivers,
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
          logger.error(installError);
          throw installError;
        }

        logger.info('Starting selenium');
        selenium.start({
          drivers: drivers
        }, function seleniumStart(startError, child) {
          if (startError) {
            logger.error(startError);
            throw startError;
          }

          selenium.child = child;
          deferred.resolve();
        });
      });
    }
  });

  return deferred.promise;
}


var wdioConfig = {

  // ==========
  // Test Files
  // ==========
  specs: [
    './test/acceptance/features/**/*.feature'
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
  reporter: 'spec',
  cucumberOpts: {
    require: [
      './test/acceptance/features/steps/**/*.js',
      './test/acceptance/features/pages/**/*.js',
      './test/acceptance/features/support/**/*.js'
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

exports.config = wdioConfig;
