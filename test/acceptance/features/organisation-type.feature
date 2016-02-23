Feature: Organisation type
  As a user
  I want to be able to state what industry I work in
  So that my enquiry can be hanlded correctly

  Background:
    Given I am on the "Organisation Type" page

  @invalid
  Scenario: Submitted incomplete
    When I don't complete the "Organisation Type" form
    Then I should see validation for the "Organisation Type" page

  @valid
  Scenario: Submitted complete
    When I complete the "Organisation Type" form
    Then I should not be on the "Organisation Type" page

  @navigation
  Scenario: Step backwards
    When I go back a step
    Then I should be on the step before the "Organisation Type" page
