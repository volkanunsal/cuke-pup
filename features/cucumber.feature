Feature: To search cucumber in google

  @CucumberScenario
  Scenario: Cucumber Google Search
    Given I am on "Google" search page
    When I type "cucumber"
    When I click on search button
    Then I clear the search text