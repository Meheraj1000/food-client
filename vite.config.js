import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Dynamically split chunks from `node_modules`
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0];
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit to 1000 KB
  },
});
