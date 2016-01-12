@wip
Feature: Enquiry reason
  As a user
  I want to be able to complete the enquiry reason step
  So that I can continue with my enquiry

  Scenario: Submitted fully incomplete
    Given I am on the "Enquiry Reason" page
    Then I should see "What is your enquiry related to?"
    When I submit the "Enquiry Reason" form
    Then I should see the validation summary
    And I should see "What is your enquiry related to?"

  Scenario: Submitted partially incomplete
    Given I am on the "Enquiry Reason" page
    When I set "reason" to "Other" on the "Enquiry Reason" page
    And I submit the "Enquiry Reason" form
    Then I should see the validation summary
    And I should see "Tell us the reason you want to get in touch"

  Scenario: Submitted complete
    Given I am on the "Enquiry Reason" page
    When I set "reason" to "Export" on the "Enquiry Reason" page
    And I submit the "Enquiry Reason" form
    Then I should not see "What is your enquiry related to?"
