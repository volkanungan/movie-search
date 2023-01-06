import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/movie-search/',
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    setupFiles: ['./src/lib/setupVitest.ts'],
  },
});
