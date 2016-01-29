'use strict';

var _ = require('underscore');
var ua = require('universal-analytics');
var config = require('../config');

var visitor = ua(config.trackingId);

module.exports = {

  /**
   * Send an event to the analytics provider
   *
   * @example
   * analytics.event({
   *   category: 'File Download',
   *   action: 'click',
   *   label: 'Filename.jpg',
   *   value: 40
   * }, function() {
   *   // callback
   * });
   * @example
   * analytics.event('File Download', 'click', 'Filename.jpg', 40, function() {
   *   // callback
   * });
   *
   * @param {string}/{object} category The category of the event
   * @param {string} action The event action
   * @param {string} label Label of the event
   * @param {string} value Value of the event
   * @param {string} callback Callback function for the call
   */
  event: function sendEvent(category, action, label, value, callback) {
    if (typeof category === 'object' && category !== null) {
      var params = {};
      _.each(category, function eachKey(v, k) {
        switch (k) {
          case 'category':
            k = 'ec';
            break;
          case 'action':
            k = 'ea';
            break;
          case 'label':
            k = 'el';
            break;
          case 'value':
            k = 'ev';
            break;
          default:
            k = k;
        }
        params[k] = v;
      });
      category = params;
    }

    visitor.event(category, action, label, value, callback);
  }

};
