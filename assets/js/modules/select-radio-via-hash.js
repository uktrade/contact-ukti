'use strict';

module.exports = {

  init: function init() {
    this.selectRadioButton();
  },

  selectRadioButton: function() {
    if (window.location.hash) {
      var hashId = window.location.hash.substring(1);
      var radio = document.getElementById(hashId);
      if (radio) {
        radio.checked = true;
      }
    }
  }
};
