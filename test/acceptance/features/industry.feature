Feature: Operating Industry
  As a user
  I want to be able to state what industry I work in
  So that my enquiry can be hanlded correctly

  Background:
    Given I am on the "Industry" page

  @invalid
  Scenario: Submitted incomplete
    When I don't complete the "Industry" form
    Then I should see validation for the "Industry" page

  @valid
  Scenario: Submitted complete
    When I complete the "Industry" form
    Then I should not be on the "Industry" page
