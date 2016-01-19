'use strict';

/*
 * Page object
 * Detaches UI interactions from step definitions
 *
 */
var name = 'Check Details';
var Page = function Page(client) {

  /**
   * Private
   */

  var url = '/contact-ukti/confirm';
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

  this.submit = function submitForm() {
    return client
      .submitForm($form);
  };

};

module.exports = {
  class: Page,
  name: name
};
