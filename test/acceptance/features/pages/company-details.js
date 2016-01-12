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

  var url = '/contact-ukti/company-details';
  var fields = {
    orgName: {
      selector: '#org-name',
      value: 'My company Ltd'
    },
    orgType: {
      selector: '[name="org-type"]',
      value: 'company'
    },
    sector: {
      selector: '#sector',
      value: 'Advanced Engineering'
    },
    turnover: {
      selector: '#annual-turnover',
      value: '100000'
    },
    noEmployees: {
      selector: '#no-employees',
      value: '100'
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
      .setValue(fields.orgName.selector, fields.orgName.value)
      .click(fields.orgType.selector + '[value="' + fields.orgType.value + '"]')
      .setValue(fields.sector.selector, fields.sector.value)
      .setValue(fields.turnover.selector, fields.turnover.value)
      .setValue(fields.noEmployees.selector, fields.noEmployees.value)
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
        return res.value.length === 3;
      });
  };

};

module.exports = {
  class: Page,
  name: name
};
