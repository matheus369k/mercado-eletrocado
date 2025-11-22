import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    exclude: ['node_modules/*', 'dist/*'],
    alias: { '@': path.resolve(__dirname, 'src') },
    environmentOptions: {
      jsdom: {
        url: 'http://localhost:5173',
      },
    },
    testTimeout: 10000,
    env: process.env,
    clearMocks: true,
    mockReset: true,
    setupFiles: ['src/vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      clean: true,
    },
  },
});
