Feature: Company location
  As a user
  I want to be able to say where my company is
  So that my enquiry can be hanlded correctly

  Background:
    Given I am on the "Company Location" page

  @invalid
  Scenario: Submitted incomplete
    When I don't complete the "Company Location" form
    Then I should see validation for the "Company Location" page

  @valid
  Scenario: Submitted complete
    When I complete the "Company Location" form
    Then I should not be on the "Company Location" page
