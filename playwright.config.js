import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'features/*.feature',
  // Put both the steps and the state fixture inside an array here:
  steps: ['steps/*.js', 'fixtures/state.js'], 
});

export default defineConfig({
  testDir,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'https://jsonplaceholder.typicode.com',
    trace: 'retain-on-failure'
  },
  // Basic timeout settings for reliability
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
});