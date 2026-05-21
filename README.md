API Automation Framework (Focus Assessment 3)

This repository contains a standalone API test automation framework built using Playwright and playwright-bdd.

API Documentation Reference: JSONPlaceholder Guide

🏗️ Architectural Approach

This framework implements the Service Object Model pattern, solving common API testing issues:

Fail-Fast Validation: The PostService validates raw HTTP responses (ensuring < 400 status codes) before passing data to the step definitions, preventing silent step failures.

Isolated Scenario State: Utilizes Playwright custom fixtures (sharedState) to pass data safely between Given/When/Then steps, ensuring parallel execution safety without global variable leakage.

🏃 Running the Tests

How it works: Because we use BDD, we must first compile our English .feature files into JavaScript tests. The npx bddgen command handles this translation automatically.

Run Everything (Recommended):

npm run test


(This triggers our custom script inside package.json which runs npx bddgen && npx playwright test)

Run a Specific Test by Name:

npx playwright test -g "Create a new post"


Run Tests by Tag (e.g., @smoke):

npx playwright test --grep @smoke


🐛 Debugging & Traces

If an API test fails, do not use show-trace directly. Instead, view the embedded network logs via the HTML report:

npm run report


This opens a browser displaying the exact API payload, headers, and response bodies for any failed test.

📂 Project Structure

├── features/               # Gherkin API Test Scenarios (posts.feature)

├── fixtures/               # Playwright custom fixtures (state.js for isolated data)

├── services/               # Service Object classes (PostService.js)

├── steps/                  # Step Definitions (api.steps.js)

├── playwright.config.js    # Master Framework Configuration

└── package.json            # Dependencies and npm scripts


🚀 Future Improvements

As this framework scales, future additions could include:

Schema Validation: Integrating a library like ajv to strictly validate the shape of the JSON responses against a defined contract.

Dynamic Data Generation: Using a tool like Faker.js to generate dynamic names and emails for POST requests instead of hardcoded strings.

Multi-Environment Config: Expanding playwright.config.js to accept process.env.ENV variables to seamlessly switch between DEV, STAGING, and PROD endpoints.

