import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    watch: {
      usePolling: true,
      interval: 3000
    },
    host: '0.0.0.0',
    port: 3000,
  },
  base: '/16pad-demo/' // GitHub Pages用に修正
})
