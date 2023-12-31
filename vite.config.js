import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: '/src',
      public: '/public',
    },
  },
  base: '',
  server: {
    host: true,
    port: 8080,
  },
})
