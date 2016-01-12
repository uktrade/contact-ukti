'use strict';

/*
 * enquiry-reason.js
 *
 * Enquiry reason page object
 * Detaches UI interactions from step definitions
 *
 */
var EnquiryReasonPage = function EnquiryReasonPage(client) {
  this.fields = {
    reason: {
      selector: '[name="enquiry-reason"]',
      type: 'choice'
    },
    other: {
      selector: '[name="enquiry-reason-other"]'
    }
  };
  this.form = 'form';

  this.get = function get(callback) {
    client
      .url('/contact-ukti/enquiry-reason')
      .call(callback);
  };

  this.completeForm = function completeForm(reason, callback) {
    client
      .selectByValue(this.fields.reason.selector, reason)
      .submitForm(this.form)
      .call(callback);
  };

  this.setValue = function setField(field, value, callback) {
    field = this.fields[field];

    if (field.type === 'choice') {
      client
        .click(field.selector + '[value="' + value + '"]')
        .call(callback);
    } else {
      client
        .setValue(field.selector, value)
        .call(callback);
    }
  };

  this.submitForm = function submitForm(callback) {
    client
      .submitForm(this.form)
      .call(callback);
  };

};

module.exports = {
  class: EnquiryReasonPage,
  name: 'Enquiry Reason'
};
