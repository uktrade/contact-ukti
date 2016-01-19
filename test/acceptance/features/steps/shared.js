'use strict';

/*
 * shared.js
 *
 * Provides shared step definitions
 *
 */
var sharedSteps = function sharedSteps() {

  /**
   * Go to a url of a page object
   *
   * Usage: Given I am on the "Enquiry" page
   * Usage: Given I go to the "Enquiry" page
   *
   * @params {string} pageName The requested page object name
   */
  this.Given(/^I (?:am on|go to) the "([^"]*)" page$/, function gotoPage(pageName) {
    return browser.utils
      .getPage(pageName)
      .get();
  });

  /**
   * Submit an incomplete form for a given page object
   *
   * Usage: When I don't complete the "Enquiry" form
   *
   * @params {string} pageName The requested page object name
   */
  this.When(/^I don't complete the "([^"]*)" form$/, function completeForm(pageName) {
    return browser.utils
      .getPage(pageName)
      .submit();
  });

  /**
   * Submit a complete form for a given page object
   *
   * Usage: When I complete the "Enquiry" form
   *
   * @params {string} pageName The requested page object name
   */
  this.When(/^I complete the "([^"]*)" form$/, function submitForm(pageName) {
    return browser.utils
      .getPage(pageName)
      .complete();
  });

  /**
   * Check that the validation summary is present for given page object
   *
   * Usage: Then I should see the validation for the "Enquiry" page
   *
   * @params {string} pageName The requested page object name
   * @params {function} next The callback function of the scenario
   */
  this.Then(/^I should see validation for the "([^"]*)" page$/, function seeValidation(pageName, next) {
    browser.utils
      .getPage(pageName)
      .hasErrors()
      .should.eventually.equal(true)
      .and.notify(next);
  });

  /**
   * Check url does not match for given page object
   *
   * Usage: Then I should not be on the "Enquiry" page
   *
   * @params {string} pageName The requested page object name
   * @params {function} next The callback function of the scenario
   */
  this.Then(/^I should not be on the "([^"]*)" page$/, function shouldNotBeOn(pageName, next) {
    var url = browser.utils.getPage(pageName).getUrl();

    browser
      .getUrl()
      .should.eventually.not.equal(url)
      .and.notify(next);
  });

  /**
   * Check the current body content contains
   * supplied text
   *
   * Usage: Then I should see "some text"
   *
   * @params {string} text The text to check for
   * @params {function} next The callback function of the scenario
   */
  this.Then(/^I should see "([^"]*)"$/, function shouldSee(text, next) {
    browser
      .getText('body')
      .should.eventually.contain(text)
      .and.notify(next);
  });

  /**
   * Check the current body content does not
   * contain supplied text
   *
   * Usage: Then I should not see "some text"
   *
   * @params {string} text The text to check on
   * @params {function} next The callback function of the scenario
   */
  this.Then(/^I should not see "([^"]*)"$/, function shouldNotSee(text, next) {
    browser
      .getText('body')
      .should.eventually.not.contain(text)
      .and.notify(next);
  });

  /**
   * Check the current page title matches
   * supplied title
   *
   * Usage: Then I should "some title" as the page title
   *
   * @params {string} text The title to check for
   * @params {function} next The callback function of the scenario
   */
  this.Then(/^I should see "([^"]*)" as the page title$/, function shouldSeePageTitle(title, next) {
    browser
      .getTitle()
      .should.eventually.equal(title)
      .and.notify(next);
  });

};

module.exports = sharedSteps;
