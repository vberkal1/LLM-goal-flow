import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      app: path.resolve(rootDir, 'src/app'),
      pages: path.resolve(rootDir, 'src/pages'),
      widgets: path.resolve(rootDir, 'src/widgets'),
      features: path.resolve(rootDir, 'src/features'),
      entities: path.resolve(rootDir, 'src/entities'),
      shared: path.resolve(rootDir, 'src/shared'),
      test: path.resolve(rootDir, 'src/test'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
});
