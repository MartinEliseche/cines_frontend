import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  server: {
    host: true, 
    port: 5173,  
    strictPort: true,
  },
  
  build: {
    outDir: 'dist', 
    emptyOutDir: true,
    sourcemap: false 
  },

  preview: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  }
});