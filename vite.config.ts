import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const backendUrl = env.VITE_API_URL || 'http://127.0.0.1:8000'

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5173,
      allowedHosts: true,
      proxy: {
        // changeOrigin: false is required for multi-tenancy: it preserves the
        // browser's original Host header (pulsecare.com / pulsecare1.com) all
        // the way to Frappe, which uses that header (dns_multitenancy) to pick
        // the matching site/database. One dev server + one proxy target serves
        // every tenant; do not fork this config per tenant.
        '/api': {
          target: backendUrl,
          changeOrigin: false,
          secure: false,
        },
        '/assets': {
          target: backendUrl,
          changeOrigin: false,
        },
        '/files': {
          target: backendUrl,
          changeOrigin: false,
        },
        // Frappe's built-in Desk (admin UI) — proxied so it's reachable at
        // the same :5173 origin (e.g. /app or /desk) instead of requiring
        // direct access to the backend port, which isn't always forwarded
        // the same way in every local setup.
        '/app': {
          target: backendUrl,
          changeOrigin: false,
        },
        '/desk': {
          target: backendUrl,
          changeOrigin: false,
        },
      },
    },
  }
})