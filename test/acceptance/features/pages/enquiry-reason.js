'use strict';

/*
 * Page object
 * Detaches UI interactions from step definitions
 *
 */
var name = 'Enquiry Reason';
var Page = function Page(client) {

  /**
   * Private
   */

  var url = '/contact-ukti/enquiry-reason';
  var fields = {
    reason: {
      selector: '[name="enquiry-reason"]',
      value: 'Exporting from the UK or investing overseas'
    },
    other: {
      selector: '[name="enquiry-reason-other"]',
      value: 'My other reason'
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
      .click(fields.reason.selector + '[value="' + fields.reason.value + '"]')
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
