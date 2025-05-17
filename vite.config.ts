import { defineConfig } from 'vite';

export default defineConfig({
  base: '/ac-heatmap-img/',
  build: {
    outDir: 'dist',
    target: 'esnext',
    sourcemap: true
  },
  server: {
    port: 3000,
    open: true
  }
}); 
