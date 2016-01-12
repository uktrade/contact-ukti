'use strict';

/*
 * enquiry-reason.js
 *
 * Provides enquiry reason step definitions
 *
 */
var enquiryReasonSteps = function enquiryReasonSteps() {

  /**
   * Make Sign in page object to every defintion
   *
   * @params {function} callback The callback function of the scenario
   */
  this.Before(function beforeEnquiryReason(callback) {
    this.Page = new browser.pages['Enquiry Reason']();
    callback();
  });

  /**
   * Submit the form for a given page object
   *
   * Usage: When I submit the "Signin" form
   *
   * @params {string} page The requested page object name
   * @params {function} next The callback function of the scenario
   */
  this.When(/^I set enquiry reason to "([^"]*)"$/, function setValue(choice, next) {
    this.Page.setField('reason', 'Other', next);
  });

};

module.exports = enquiryReasonSteps;
