'use strict';

var $ = require('jquery');
var analytics = require('./analytics');

module.exports = {

  el: 'a[href]',

  baseURI: window.location.host,

  init: function init() {
    this.cacheEls();
    this.bindEvents();
  },

  cacheEls: function cacheEls() {
    this.$body = $('body');
  },

  bindEvents: function bindEvents() {
    this.$body.on('click', this.el, this.clickHandler.bind(this));
  },

  clickHandler: function clickHandler(e) {
    // abandon if link already aborted or analytics is not available
    if (e.isDefaultPrevented() || typeof ga !== 'function') {
      return;
    }

    // abandon if no active link or link within domain
    var $link = $(e.target);
    if ($link.length !== 1 || this.baseURI === $link[0].host) {
      return;
    }

    e.preventDefault();
    var href = $link[0].href;
    var timeout;

    function loadPage() {
      clearTimeout(timeout);
      window.document.location = href;
    }

    // redirect after one second if recording takes too long
    timeout = setTimeout(loadPage, 1000);

    analytics.sendEvent({
      'hitType': 'event',
      'eventCategory': 'Outbound',
      'eventAction': this.getAction(href),
      'eventLabel': this.cleanLabel(href),
      'hitCallback': loadPage
    });
  },

  getAction: function getLinkType(href) {
    var lowercased = href.toLowerCase();

    if (lowercased.indexOf('mailto') !== -1) {
      return 'mailto';
    }

    return 'external';
  },

  cleanLabel: function cleanLabel(label) {
    return label.replace('mailto:', '');
  }

};
