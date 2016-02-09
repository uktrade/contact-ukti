Feature: Previously Exported
  As a user
  I want to be able to say whether I have exported before
  So that my enquiry can be hanlded correctly

  Background:
    Given I am on the "Exported Before" page

  @invalid
  Scenario: Submitted incomplete
    When I don't complete the "Exported Before" form
    Then I should see validation for the "Exported Before" page

  @valid
  Scenario: Submitted complete
    When I complete the "Exported Before" form
    Then I should not be on the "Exported Before" page

  @navigation
  Scenario: Step backwards
    When I go back a step
    Then I should be on the step before the "Exported Before" page
