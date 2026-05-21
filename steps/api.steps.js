import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { PostService } from '../services/PostService.js';
// 1. Import our new custom test fixture
import { test } from '../fixtures/state.js'; 

// 2. Pass the extended test fixture to createBdd
const { Given, When, Then } = createBdd(test);

// --- GIVEN ---
Given('the JSONPlaceholder API is available', async () => {
  // Simple setup step for readability
});

Given('an existing post with ID {int}', async ({ sharedState }, id) => {
  sharedState.postId = id; // Store ID safely in the isolated scenario state
});

Given('I have a new post payload with title {string} and body {string}', async ({ sharedState }, title, body) => {
  sharedState.payload = { title, body }; 
});

// --- WHEN ---
When('I request all posts', async ({ request, sharedState }) => {
  const postService = new PostService(request);
  sharedState.response = await postService.getAllPosts();
});

// Added for the "Filtered Data" requirement!
When('I request posts filtered by userId {int}', async ({ request, sharedState }, userId) => {
  const postService = new PostService(request);
  sharedState.response = await postService.getPostsByUserId(userId);
});

When('I send a POST request to create the post', async ({ request, sharedState }) => {
  const postService = new PostService(request);
  sharedState.response = await postService.createPost(
    sharedState.payload.title,
    sharedState.payload.body
  );
});

When('I update the post with title {string}', async ({ request, sharedState }, newTitle) => {
  const postService = new PostService(request);
  // Using an "updates object" to fix the hidden mutations feedback!
  sharedState.response = await postService.updatePost(sharedState.postId, { title: newTitle });
});

When('I delete the post', async ({ request, sharedState }) => {
  const postService = new PostService(request);
  sharedState.response = await postService.deletePost(sharedState.postId);
});

When('I request a post with ID {int}', async ({ request, sharedState }, id) => {
  const postService = new PostService(request);
  sharedState.response = await postService.getPostById(id); // Hardcoded ID removed
});


// --- THEN ---
Then('the response status should be {int}', async ({ sharedState }, statusCode) => {
  expect(sharedState.response.status()).toBe(statusCode);
});

Then('the response should contain more than {int} posts', async ({ sharedState }, count) => {
  const body = await sharedState.response.json();
  expect(body.length).toBeGreaterThan(count);
});

Then('all returned posts should belong to userId {int}', async ({ sharedState }, userId) => {
  const body = await sharedState.response.json();
  // Validates our Filtered Data requirement
  body.forEach(post => {
    expect(post.userId).toBe(userId);
  });
});

Then('the response body should match title {string} and body {string}', async ({ sharedState }, expectedTitle, expectedBody) => {
  const body = await sharedState.response.json();
  expect(body.title).toBe(expectedTitle);
  expect(body.body).toBe(expectedBody);
});

Then('the response body should reflect the updated title {string}', async ({ sharedState }, expectedTitle) => {
  const body = await sharedState.response.json();
  expect(body.title).toBe(expectedTitle);
});