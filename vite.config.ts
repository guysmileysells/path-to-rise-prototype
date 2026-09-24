import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Allow verified mobile/public preview tunnels to reach this local prototype.
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
})
