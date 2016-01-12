Feature: Enquiry
  As a user
  I want to be able to enter details about my enquiry
  So that my enquiry can be hanlded correctly

  Background:
    Given I am on the "Enquiry" page

  @invalid
  Scenario: Submitted incomplete
    When I don't complete the "Enquiry" form
    Then I should see validation for the "Enquiry" page

  @valid
  Scenario: Submitted complete
    When I complete the "Enquiry" form
    Then I should not be on the "Enquiry" page
