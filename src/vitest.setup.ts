import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

vi.mock('@/env.ts', () => ({
  env: {
    VITE_DATABASE_URL: 'http://localhost:3000',
  },
}));

afterEach(() => {
  cleanup();
});
