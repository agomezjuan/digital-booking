import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    files: ['**/*.test.jsx'],
    setupFiles: ['./src/tests/setup.js'],
    css: true,
  },
});
