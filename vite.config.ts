import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Allow verified mobile/public preview tunnels to reach this local prototype.
export default defineConfig({
  // Relative asset paths keep the static prototype portable across Vercel root deploys,
  // GitHub Pages subpath previews, and local/mobile tunnel reviews.
  base: './',
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
