import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const BACKEND_URL = env.VITE_DEV_BACKEND_URL || env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: {
        '/api': {
          target: BACKEND_URL,
          changeOrigin: true,
          secure: false,
        },
        '/media': {
          target: BACKEND_URL,
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
})
