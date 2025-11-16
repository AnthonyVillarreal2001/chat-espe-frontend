import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dominio de Railway frontend
const ALLOWED_HOST = "daring-warmth-production.up.railway.app";

export default defineConfig({
  plugins: [react()],

  // Usado sólo en desarrollo (vite dev)
  server: {
    host: true,
    port: 5173,
    allowedHosts: [ALLOWED_HOST],
  },

  // Usado en Railway (vite preview)
  preview: {
    host: true,
    port: 8080,
    allowedHosts: [ALLOWED_HOST],
  },
})
