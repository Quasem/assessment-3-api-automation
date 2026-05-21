Feature: API Testing with JSONPlaceholder

  Scenario: Retrieve a list of posts (GET)
    Given the JSONPlaceholder API is available
    When I request all posts
    Then the response status should be 200
    And the response should contain more than 0 posts

  Scenario: Retrieve filtered data (GET)
    Given the JSONPlaceholder API is available
    When I request posts filtered by userId 1
    Then the response status should be 200
    And all returned posts should belong to userId 1

  Scenario: Create a new post (POST)
    Given I have a new post payload with title "My First API Test" and body "Playwright is awesome"
    When I send a POST request to create the post
    Then the response status should be 201
    And the response body should match title "My First API Test" and body "Playwright is awesome"

  Scenario: Update an existing post (PUT)
    Given an existing post with ID 1
    When I update the post with title "Updated Title"
    Then the response status should be 200
    And the response body should reflect the updated title "Updated Title"

  Scenario: Delete a post (DELETE)
    Given an existing post with ID 1
    When I delete the post
    Then the response status should be 200

  Scenario: Handle Not Found Error (GET - Exception Handling)
    Given the JSONPlaceholder API is available
    When I request a post with ID 99999
    Then the response status should be 404