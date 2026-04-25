import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach } from 'vitest';
import { resetAppStore } from 'app/store/store';

beforeEach(() => {
  resetAppStore();
});

afterEach(() => {
  cleanup();
});
