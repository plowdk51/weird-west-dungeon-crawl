import { defineConfig } from 'vitest/config';

// `base` is the GitHub Pages sub-path; overridable for other hosts.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/weird-west-dungeon-crawl/',
  test: {
    include: ['tests/**/*.test.ts'],
  },
});
