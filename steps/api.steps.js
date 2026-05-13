import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { PostService } from '../services/PostService.js';

const { When, Then } = createBdd();

// We store the response here so the 'When' steps can save it, 
// and the 'Then' steps can read it to make assertions.
let response; 

// --- GET (Retrieve Data) ---
When('I request all posts', async ({ request }) => {
  const postService = new PostService(request);
  response = await postService.getAllPosts();
});

// --- POST (Create Data) ---
When('I create a new post with title {string} and body {string}', async ({ request }, title, body) => {
  const postService = new PostService(request);
  response = await postService.createPost(title, body);
});

// --- PUT (Update Data) ---
When('I update post {int} with title {string}', async ({ request }, id, title) => {
  const postService = new PostService(request);
  response = await postService.updatePost(id, title);
});

// --- DELETE (Remove Data) ---
When('I delete post {int}', async ({ request }, id) => {
  const postService = new PostService(request);
  response = await postService.deletePost(id);
});

// --- EXCEPTION HANDLING (404 Not Found) ---
When('I request a post that does not exist', async ({ request }) => {
  const postService = new PostService(request);
  response = await postService.getNonExistentPost();
});


// ==========================================
// ASSERTIONS (The 'Then' steps)
// ==========================================

Then('the response status should be {int}', async ({}, statusCode) => {
  expect(response.status()).toBe(statusCode);
});

Then('the response should contain more than {int} posts', async ({}, count) => {
  // Parse the JSON body from the response
  const responseBody = await response.json();
  expect(responseBody.length).toBeGreaterThan(count);
});

Then('the response body should match the created post', async ({}) => {
  const responseBody = await response.json();
  expect(responseBody.title).toBe("My First API Test");
  expect(responseBody.body).toBe("Playwright is awesome");
});

Then('the response body should reflect the updated title', async ({}) => {
  const responseBody = await response.json();
  expect(responseBody.title).toBe("Updated Title");
});