import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // UI component libraries
          'ui-vendor': ['@radix-ui/react-dropdown-menu', '@radix-ui/react-label', '@radix-ui/react-select', '@radix-ui/react-slot', 'lucide-react'],
          // Data fetching and state
          'query-vendor': ['@tanstack/react-query', 'axios', 'zustand'],
          // Form handling
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          // Utilities and other libraries
          'util-vendor': ['clsx', 'tailwind-merge', 'react-helmet-async', 'sonner', 'i18next', 'react-i18next', 'i18next-browser-languagedetector'],
          // Charts and markdown
          'content-vendor': ['recharts', 'react-markdown', 'remark-gfm', 'react-syntax-highlighter'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
