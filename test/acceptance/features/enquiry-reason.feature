Feature: Enquiry reason
  As a user
  I want to be able to complete the enquiry reason step
  So that I can continue with my enquiry

  Background:
    Given I am on the "Enquiry Reason" page

  @invalid
  Scenario: Submitted incomplete
    When I don't complete the "Enquiry Reason" form
    Then I should see validation for the "Enquiry Reason" page

  @valid
  Scenario: Submitted complete
    When I complete the "Enquiry Reason" form
    Then I should not be on the "Enquiry Reason" page

  @navigation
  Scenario: Step backwards
    Then I should not see "Back"
