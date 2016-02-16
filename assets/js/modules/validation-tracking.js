'use strict';

var $ = require('jquery');
var analytics = require('./analytics');

module.exports = {

  el: '.validation-summary',

  init: function init() {
    this.cacheEls();
    this.sendErrors();
  },

  cacheEls: function cacheEls() {
    this.$errorSummary = $(this.el);
    this.$errors = this.$errorSummary.find('a');
  },

  sendErrors: function sendErrors() {
    this.$errors.each(function eachError(i, el) {
      var $el = $(el);
      var id = $el.attr('href').replace('#', '');

      this.sendError(id, $el.text());
    }.bind(this));
  },

  sendError: function sendError(field, message) {
    analytics.sendEvent({
      hitType: 'event',
      eventCategory: 'Validation error',
      eventAction: field,
      eventLabel: message
    });
  }

};
