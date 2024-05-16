import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "https://nanbont.github.io/Netflix-Clone-2024/netflix-clone/",

  server: {
    hmr: {
      overlay: false
    }
  }
});



