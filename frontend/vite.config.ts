import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://tu-backend.onrender.com',  // ← Cambia por URL de Render (Paso 3)
        changeOrigin: true,
      },
    },
  },
  define: {
    'process.env.BACKEND_URL': JSON.stringify('https://tu-backend.onrender.com')
  }
});