Feature: API Testing with JSONPlaceholder

  Scenario: Retrieve a list of posts (GET)
    When I request all posts
    Then the response status should be 200
    And the response should contain more than 0 posts

  Scenario: Create a new post (POST)
    When I create a new post with title "My First API Test" and body "Playwright is awesome"
    Then the response status should be 201
    And the response body should match the created post

  Scenario: Update an existing post (PUT)
    When I update post 1 with title "Updated Title"
    Then the response status should be 200
    And the response body should reflect the updated title

  Scenario: Delete a post (DELETE)
    When I delete post 1
    Then the response status should be 200

  Scenario: Handle Not Found Error (GET - Exception Handling)
    When I request a post that does not exist
    Then the response status should be 404