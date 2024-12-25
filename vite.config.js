import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy:{
      'https://myyoutube-0non.onrender.com/api': {
        target: 'http://localhost:3000',
      }
    }
  }
})
