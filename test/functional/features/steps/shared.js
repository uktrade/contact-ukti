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
   * Usage: Given I am on the "Signin" page
   * Usage: Given I go to the "Signin" page
   *
   * @params {string} page The requested page object name
   * @params {function} next The callback function of the scenario
   */
  this.Given(/^I (?:am on|go to) the "([^"]*)" page$/, function gotoPage(pageName, next) {
    if (!browser.pages[pageName]) {
      var errStr = 'Could not find page named "' + pageName + '" in the PageObjectMap, did you remember to add it?';
      throw new Error(errStr);
    }

    var page = new browser.pages[pageName](browser);
    page.get(next);
  });

  /**
   * Submit the form for a given page object
   *
   * Usage: When I submit the "Signin" form
   *
   * @params {string} page The requested page object name
   * @params {function} next The callback function of the scenario
   */
  this.When(/^I submit the "([^"]*)" form$/, function submitForm(pageName, next) {
    if (!browser.pages[pageName]) {
      var errStr = 'Could not find page named "' + pageName + '" in the PageObjectMap, did you remember to add it?';
      throw new Error(errStr);
    }

    var page = new browser.pages[pageName](browser);
    page.submitForm(next);
  });

  /**
   * Set the value of a field for a given page object
   *
   * Usage: When I set "username" to "donaldduck" on the "Signin" page
   *
   * @params {string} field The name of the field
   * @params {string} value The value of the field to be set
   * @params {string} page The requested page object name
   * @params {function} next The callback function of the scenario
   */
  this.When(/^I set "([^"]*)" to "([^"]*)" on the "([^"]*)" page$/, function submitForm(field, value, pageName, next) {
    if (!browser.pages[pageName]) {
      var errStr = 'Could not find page named "' + pageName + '" in the PageObjectMap, did you remember to add it?';
      throw new Error(errStr);
    }

    var page = new browser.pages[pageName](browser);
    page.setValue(field, value, next);
  });

  /**
   * Check that the validation summary is present
   *
   * Usage: Then I should see the validation summary
   *
   * @params {function} next The callback function of the scenario
   */
  this.Then(/^I should see the validation summary$/, function shouldSee(next) {
    browser
      .isVisible('.validation-summary')
      .should.eventually.equal(true)
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
