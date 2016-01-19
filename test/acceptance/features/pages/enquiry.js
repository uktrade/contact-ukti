'use strict';

/*
 * Page object
 * Detaches UI interactions from step definitions
 *
 */
var name = 'Enquiry';
var Page = function Page(client) {

  /**
   * Private
   */

  var url = '/contact-ukti/enquiry';
  var fields = {
    enquiryDescription: {
      selector: '#enquiry-description',
      value: 'My enquiry details'
    }
  };
  var $errors = '.validation-error';
  var $form = 'form';

  /**
   * Public
   */

  this.get = function get() {
    return client.utils
      .completeSteps(name)
      .then(function completedSteps() {
        return client.url(url);
      });
  };

  this.getUrl = function getUrl() {
    return url;
  };

  this.complete = function completeForm() {
    return client
      .setValue(fields.enquiryDescription.selector, fields.enquiryDescription.value)
      .submitForm($form);
  };

  this.submit = function submitForm() {
    return client
      .submitForm($form);
  };

  this.hasErrors = function hasErrors() {
    return client
      .elements($errors)
      .then(function elementsResult(res) {
        return res.value.length === 1;
      });
  };

};

module.exports = {
  class: Page,
  name: name
};
