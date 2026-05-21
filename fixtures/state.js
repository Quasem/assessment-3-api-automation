import { test as base } from 'playwright-bdd';

// We extend the base test object to include our custom 'sharedState' fixture
export const test = base.extend({
  sharedState: async ({}, use) => {
    // This empty object is created completely fresh for EVERY individual test scenario
    const state = {};
    await use(state);
  }
});