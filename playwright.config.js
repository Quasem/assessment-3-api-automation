import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

// This function tells the BDD tool where your files are located
const testDir = defineBddConfig({
  features: 'features/*.feature',
  steps: 'steps/*.js',
});

export default defineConfig({
  testDir,
  reporter: [['html', { open: 'never' }]],
  use: {
    // Setting the baseURL allows you to use relative paths like '/' in your tests
    baseURL: 'https://jsonplaceholder.typicode.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    
    // Setting headless to false allows you to see the browser while it runs
    headless: false,
  },
  // Basic timeout settings for reliability
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
});