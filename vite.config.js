import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Route components are code-split via React.lazy in main.jsx. Everything from
// node_modules goes into long-lived vendor chunks so app changes never
// invalidate the dependency cache.
function manualChunks(id) {
  if (!id.includes('node_modules')) return
  if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react-vendor'
  if (id.includes('react-router')) return 'router'
  if (id.includes('react-icons')) return 'icons'
  return 'vendor'
}

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  ssr: {
    // react-icons ships directory imports that Node's ESM loader rejects, so it
    // has to be bundled into the build-time render entry rather than left external.
    noExternal: ['react-icons'],
  },
  build: {
    // Minification is on by default and uses Rolldown's native Oxc minifier;
    // Vite 8 no longer ships esbuild, so naming it here would fail the build.
    rollupOptions: {
      // The build-time render entry resolves every route through dynamic
      // import() (see entry-server.jsx prepare()). Turning code splitting off
      // keeps dist-ssr a single file that prerender-meta.js can import
      // directly. codeSplitting and manualChunks are mutually exclusive, hence
      // the branch rather than one shared output config.
      output: isSsrBuild ? { codeSplitting: false } : { manualChunks },

      // src/App.jsx is deliberately both statically imported by main.jsx (so
      // the landing page needs no extra round trip) and dynamically imported by
      // the route registry (so entry-server.jsx can resolve it the same way as
      // every other route). Rolldown is right that the dynamic import cannot
      // split it out; that is the intent, so the warning is noise.
      onwarn(warning, warn) {
        if (warning.code === 'INEFFECTIVE_DYNAMIC_IMPORT') return
        warn(warning)
      },
    },
    // Generate source maps for debugging but not for production
    sourcemap: false,
    // Target modern browsers for smaller bundle
    target: 'es2020',
  },
}))
