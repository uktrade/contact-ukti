Feature: Personal Details
  As a user
  I want to be able to enter my personal details
  So that I can be contacted about my enquiry

  Background:
    Given I am on the "Personal Details" page

  @invalid
  Scenario: Submitted incomplete
    When I don't complete the "Personal Details" form
    Then I should see validation for the "Personal Details" page

  @valid
  Scenario: Submitted complete
    When I complete the "Personal Details" form
    Then I should not be on the "Personal Details" page
