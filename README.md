API Automation Framework (Focus Assessment 3)

This repository contains a standalone API test automation framework built using Playwright and playwright-bdd. It demonstrates the integration of Behavior-Driven Development (BDD) with API testing, utilizing the JSONPlaceholder public API.

🎯 Project Goals & Capabilities

The primary objective of this project is to demonstrate core API interactions embedded seamlessly within a BDD structure.

The framework successfully executes and validates:

Core CRUD Operations: GET, POST, PUT, and DELETE requests.

Exception Handling: Negative path testing (e.g., asserting 404 Not Found errors).

Data Handling: Retrieving payload data, parsing JSON responses, and asserting on specific keys and values.

🏗️ Architectural Approach

To maintain clean code and separation of concerns (mirroring the UI Page Object Model from Focus 2), this framework implements the Service Object Model pattern.

1. Behavior-Driven Development (BDD)

Location: features/posts.feature

Purpose: Test scenarios are written in plain-English Gherkin syntax. This ensures the API tests serve as living documentation that non-technical stakeholders can easily understand.

2. Service Layer (The Engine)

Location: services/PostService.js

Purpose: All raw HTTP request logic (URLs, endpoints, payload construction) is isolated here using Playwright's native APIRequestContext. If the API contract changes, updates are made in this single file rather than across dozens of step definitions.

3. Step Definitions (The Glue)

Location: steps/api.steps.js

Purpose: Connects the Gherkin steps to the PostService methods, extracts the JSON responses, and executes strict assertions (e.g., expect(response.status()).toBe(200)).

🛠️ Installation & Setup

Prerequisites

Node.js (v18 or higher recommended)

Git

Setup Instructions

Clone the repository to your local machine.

Navigate to the project directory:

cd assessment-3-api-automation


Install the required dependencies (@playwright/test and playwright-bdd):

npm install


🏃 Running the Tests

This framework requires a sync generation step before execution to compile the Gherkin features into Playwright test files.

Generate BDD Tests:

npx bddgen


Execute API Tests:

npx playwright test


View Detailed HTML Report:

npx playwright show-report


📂 Project Structure

├── features/               # Gherkin API Test Scenarios (.feature)
├── services/               # Service Object classes (API request logic)
│   └── PostService.js      
├── steps/                  # Step Definitions (Glue code & assertions)
│   └── api.steps.js        
├── .features-gen/          # Auto-generated Playwright tests (Git ignored)
├── playwright.config.js    # Master Framework Configuration (BaseURL setup)
└── package.json            # Dependencies


👥 Reviewer Notes

This project proves that automation concepts learned in UI testing (Separation of Concerns, BDD integration, DRY principles) can be effectively mapped to backend API testing. Playwright's built-in request fixture is leveraged to avoid the need for external HTTP libraries like Axios or Supertest, keeping the framework lightweight and cohesive.