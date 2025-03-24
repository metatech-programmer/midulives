import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@utils': '/src/utils',
      '@hooks': '/src/hooks',
      '@constants': '/src/constants',
      '@assets': '/src/assets',
      '@store': '/src/store',
      '@api': '/src/api',
      '@styles': '/src/styles',
      '@routes': '/src/routes'
    }
  },
  plugins: [react(), tailwindcss()],

})


