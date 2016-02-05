'use strict';

/*
 * Page object
 * Detaches UI interactions from step definitions
 *
 */
var name = 'Personal Details';
var Page = function Page(client) {

  /**
   * Private
   */

  var url = '/personal-details';
  var fields = {
    fullname: {
      selector: '#fullname',
      value: 'My full name'
    },
    email: {
      selector: '#email',
      value: 'email@email.com'
    },
    phone: {
      selector: '#phone',
      value: '0123456789'
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
      .setValue(fields.fullname.selector, fields.fullname.value)
      .setValue(fields.email.selector, fields.email.value)
      .setValue(fields.phone.selector, fields.phone.value)
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
        return res.value.length === 2;
      });
  };

};

module.exports = {
  class: Page,
  name: name
};
