'use strict';

/*
 * Page object
 * Detaches UI interactions from step definitions
 *
 */
var name = 'Company Details';
var Page = function Page(client) {

  /**
   * Private
   */

  var url = '/enquiry/company-details';
  var fields = {
    orgType: {
      selector: '[name="org-type"]',
      value: 'Company or organisation'
    },
    turnover: {
      selector: '[name="annual-turnover"]',
      value: 'Under £100,000'
    },
    noEmployees: {
      selector: '[name="no-employees"]',
      value: 'Less than 10'
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
      .click(fields.orgType.selector + '[value="' + fields.orgType.value + '"]')
      .click(fields.turnover.selector + '[value="' + fields.turnover.value + '"]')
      .click(fields.noEmployees.selector + '[value="' + fields.noEmployees.value + '"]')
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
