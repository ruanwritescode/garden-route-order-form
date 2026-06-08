import { defineConfig } from 'vite';

export default defineConfig({
  // Relative base so the built site works when hosted in a subfolder or opened
  // from any path.
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
