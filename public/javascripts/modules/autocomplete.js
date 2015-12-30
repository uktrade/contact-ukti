'use strict';

var $ = require('jquery');
var Selectize = require('selectize');
var noResults = require('../plugins/autocomplete.noResults');

exports.Autocomplete = {
  el: '.js-autocomplete',

  init: function() {
    if (!(/iPhone|iPod|iPad|playbook|silk|BlackBerry/).test(navigator.userAgent)) {
      this.cacheEls();
      this.render();
    }
  },

  cacheEls: function () {
    this.$el = $(this.el);
    this.$noResults = $('<div>');
    this.$noResults
      .addClass('option empty')
      .text('No results');
  },

  render: function () {
    this.$el.selectize({
      copyClassesToDropdown: false,
      selectOnTab: true,
      openOnFocus: false,
      plugins: ['no_results']
    });
  }

};
