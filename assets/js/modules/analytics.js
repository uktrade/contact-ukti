'use strict';

module.exports = {

  sendEvent: function sendEvent(options) {
    try {
      window.ga('send', options);
    } catch(e) {
      throw e;
    }
  }

};
