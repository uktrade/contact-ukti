'use strict';

var myHooks = function myHooks() {

  /**
   * BeforeFeatures handler
   *
   * Provides access to the pagesMap
   * on browser
   *
   * @params {event} event The event being attached to
   * @params {function} callback The callback function of the hook
   */
  this.registerHandler('BeforeFeatures', function beforeFeaturesHandler(event, callback) {
    browser.pages = require('./pages-map');
    callback();
  });

  /**
   * After hook
   *
   * Run after every scenario to delete cookies and
   * kill each session
   *
   * @params {obj} scenario The scenario that has just been run
   * @params {function} callback The callback function of the hook
   */
  this.After(function afterHook(scenario, callback) {
    browser
      .deleteCookie()
      .call(callback);
  });

};

module.exports = myHooks;
