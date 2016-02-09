Feature: Company details
  As a user
  I want to be able to enter my company details
  So that my enquiry can be hanlded correctly

  Background:
    Given I am on the "Company Details" page

  @invalid
  Scenario: Submitted incomplete
    When I don't complete the "Company Details" form
    Then I should see validation for the "Company Details" page

  @valid
  Scenario: Submitted complete
    When I complete the "Company Details" form
    Then I should not be on the "Company Details" page

  @navigation
  Scenario: Step backwards
    When I go back a step
    Then I should be on the step before the "Company Details" page
