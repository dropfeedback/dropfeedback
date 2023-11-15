/// <reference types="vitest" />
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import * as dotenv from 'dotenv';

dotenv.config({ path: './.env.test' });

export default defineConfig({
  test: {
    globals: true,
    root: './',
    include: ['**/*.e2e-spec.ts'],
  },
  plugins: [
    // This is required to build the test files with SWC
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: 'es6' },
      jsc: {
        parser: {
          syntax: 'typescript',
          dynamicImport: true,
          tsx: true,
        },
        transform: {
          react: {
            runtime: 'automatic',
          },
        },
      },
    }),
  ],
});
