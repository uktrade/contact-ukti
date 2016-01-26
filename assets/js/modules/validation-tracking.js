/*global ga*/
'use strict';

var $ = require('jquery');

module.exports = {
  el: '.validation-summary',

  init: function init() {
    $(function ready() {
      this.cacheEls();
      this.sendEvents();
    }.bind(this));
  },

  cacheEls: function cacheEls() {
    this.$errorSummary = $(this.el);
    this.$errors = this.$errorSummary.find('a');
  },

  sendEvents: function sendEvent() {
    this.$errors.each(function eachError(i, el) {
      var $el = $(el);
      var id = $el.attr('href').replace('#', '');

      this.sendEvent(id, $el.text());
    }.bind(this));
  },

  sendEvent: function sendEvent(field, message) {
    try {
      ga('send', {
        hitType: 'event',
        eventCategory: 'ValidationError',
        eventAction: field,
        eventLabel: message
      });
    } catch(e) {
      throw e;
    }
  }

};
