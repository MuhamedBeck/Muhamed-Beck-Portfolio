import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Enable minification and tree-shaking
    minify: 'esbuild',
    // Split chunks for better caching
    rollupOptions: {
      output: {
        // Route components are code-split via React.lazy in main.jsx.
        // Everything from node_modules goes into long-lived vendor chunks so
        // app changes never invalidate the dependency cache.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react-vendor'
          if (id.includes('react-router')) return 'router'
          if (id.includes('react-icons') || id.includes('@lobehub')) return 'icons'
          return 'vendor'
        },
      }
    },
    // Generate source maps for debugging but not for production
    sourcemap: false,
    // Target modern browsers for smaller bundle
    target: 'es2020',
  },
})
