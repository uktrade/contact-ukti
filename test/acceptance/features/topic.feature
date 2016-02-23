Feature: Topic
  As a user
  I want to be able to complete the enquiry reason step
  So that I can continue with my enquiry

  Background:
    Given I am on the "Topic" page

  @invalid
  Scenario: Submitted incomplete
    When I don't complete the "Topic" form
    Then I should see validation for the "Topic" page

  @valid
  Scenario: Submitted complete
    When I complete the "Topic" form
    Then I should not be on the "Topic" page

  @navigation
  Scenario: Step backwards
    Then I should not see "Back"
