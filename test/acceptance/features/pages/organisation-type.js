'use strict';

/*
 * Page object
 * Detaches UI interactions from step definitions
 *
 */
var name = 'Organisation Type';
var Page = function Page(client) {

  /**
   * Private
   */

  var url = '/enquiry/organisation-type';
  var fields = {
    type: {
      selector: '[name="org-type"]',
      value: 'Company or organisation'
    },
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
      .click(fields.type.selector + '[value="' + fields.type.value + '"]')
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
