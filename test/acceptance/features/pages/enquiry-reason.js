'use strict';

/*
 * enquiry-reason.js
 *
 * Enquiry reason page object
 * Detaches UI interactions from step definitions
 *
 */
var EnquiryReasonPage = function EnquiryReasonPage(client) {

  this.get = function get(callback) {
    client
      .url('/contact-ukti/enquiry-reason')
      .call(callback);
  };

};

module.exports = {
  class: EnquiryReasonPage,
  name: 'Enquiry Reason'
};
