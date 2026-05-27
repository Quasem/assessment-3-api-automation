
API Automation Framework (Focus Assessment 3) 


🎯 Project Overview & Goals

The goal of this project is to build a robust, standalone API test automation framework using Playwright and playwright-bdd. This framework acts as an automated Quality Assurance tool to verify the backend behavior of a web application.

It successfully tests:

CRUD Operations: Creating, Reading, Updating, and Deleting resources.

Data Filtering: Retrieving specific data via query parameters.

Exception Handling: Ensuring the API gracefully handles invalid requests (e.g., 404 Not Found).

API Documentation Reference: This framework tests the JSONPlaceholder API. You can find the full documentation and guide here:

👉 https://jsonplaceholder.typicode.com/guide/


💻 Installation & Setup

To get this project running on your local machine, follow these steps:

Clone the repository:

git clone https://github.com/Quasem/assessment-3-api-automation.git

cd assessment-3-api-automation


Install the dependencies:

npm install



## 🏗️ Architectural Approach
This framework implements the **Service Object Model** pattern, solving common API testing issues:
- **Pure API Testing Strategy:** Validation is strictly deferred to the `Then` step definitions rather than the service layer. This prevents blocking legitimate negative tests (e.g., intentionally asserting a 404 response) and adheres to BDD best practices.
- **Isolated Scenario State:** Utilizes Playwright custom fixtures (`sharedState`) to pass data safely between Given/When/Then steps, ensuring parallel execution safety without global variable leakage.
- **Data-Driven Testing:** Utilizes Gherkin `Scenario Outlines` to dynamically run single API tests against multiple sets of data (e.g., different user IDs) efficiently.

🏃 Running the Tests

How it works: Because we use BDD, we must first compile our English .feature files into JavaScript tests. The npx bddgen command handles this translation automatically.

Run Everything (Recommended):

npm run test


(This triggers our custom script inside package.json which runs npx bddgen and npx playwright test back-to-back)

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

Dynamic Data Generation: Using a tool like Faker.js to generate dynamic names and emails for POST requests instead of hardcoded strings.

Multi-Environment Config: Expanding playwright.config.js to accept process.env.ENV variables to seamlessly switch between DEV, STAGING, and PROD endpoints.