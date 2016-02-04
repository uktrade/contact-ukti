'use strict';

/*
 * Page object
 * Detaches UI interactions from step definitions
 *
 */
var name = 'Company Address';
var Page = function Page(client) {

  /**
   * Private
   */

  var url = '/contact-ukti/company-address';
  var fields = {
    orgName: {
      selector: '#org-name',
      value: 'My company Ltd'
    },
    orgAddressHouseNumber: {
      selector: '#org-address-house-number',
      value: '1'
    },
    orgAddressStreet: {
      selector: '#org-address-street',
      value: 'The Mall'
    },
    orgAddressTown: {
      selector: '#org-address-town',
      value: 'London'
    },
    orgAddressCounty: {
      selector: '#org-address-county',
      value: ''
    },
    orgAddressPostcode: {
      selector: '#org-address-postcode',
      value: 'SW1A 1AA'
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
      .setValue(fields.orgAddressHouseNumber.selector, fields.orgAddressHouseNumber.value)
      .setValue(fields.orgAddressStreet.selector, fields.orgAddressStreet.value)
      .setValue(fields.orgAddressTown.selector, fields.orgAddressTown.value)
      .setValue(fields.orgAddressCounty.selector, fields.orgAddressCounty.value)
      .setValue(fields.orgAddressPostcode.selector, fields.orgAddressPostcode.value)
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
        return res.value.length === 5;
      });
  };

};

module.exports = {
  class: Page,
  name: name
};
