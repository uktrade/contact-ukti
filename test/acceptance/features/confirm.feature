@wip
Feature: Check details
  As a user
  I want to be able to see all the details I have entered before submitting
  So that I can ensure they are correct

  Background:
    Given I am on the "Check Details" page

  Scenario: On correct page
    Then I should be on the "Check Details" page

  @navigation
  Scenario: Step backwards
    Then I should not see "Back"
