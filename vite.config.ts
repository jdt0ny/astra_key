import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // GitHub Pages serves project sites from /<repository>/. The deploy workflow
  // supplies VITE_BASE_PATH; local development and other hosts use "/".
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()],
  build: {
    target: 'es2022',
  },
});
