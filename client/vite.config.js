import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// City of Palms / Trivik Courtyard — MERN replica client
// VITE_PREVIEW=true -> single self-contained index.html (JS+CSS inlined) for offline preview.
// VITE_PAGES=true   -> build for GitHub Pages project site (served under /Assetz/).
const isPreview = process.env.VITE_PREVIEW === 'true'
const isPages = process.env.VITE_PAGES === 'true'

export default defineConfig(() => ({
  plugins: [react(), ...(isPreview ? [viteSingleFile()] : [])],
  // dev (no VITE_PAGES) runs at root; Pages build/preview use the /Assetz/ sub-path
  base: isPreview ? './' : isPages ? '/Assetz/' : '/',
  server: {
    port: 5173,
    proxy: {
      // forward API + form endpoints to the Express backend during dev
      '/api': 'http://localhost:5000',
    },
  },
}))
