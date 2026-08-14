import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Trivik Courtyard — MERN client
// VITE_PREVIEW=true -> single self-contained index.html (JS+CSS inlined) for offline preview.
// VITE_PAGES=true   -> build for GitHub Pages project site (served under /Trivik_Developers/).
const isPreview = process.env.VITE_PREVIEW === 'true'
const isPages = process.env.VITE_PAGES === 'true'

export default defineConfig(() => ({
  plugins: [react(), ...(isPreview ? [viteSingleFile()] : [])],
  // dev (no VITE_PAGES) runs at root; Pages build/preview use the repo sub-path.
  // This must match the repository name or every asset 404s on the live site.
  base: isPreview ? './' : isPages ? '/Trivik_Developers/' : '/',
  server: {
    port: 5173,
    proxy: {
      // forward API + form endpoints to the Express backend during dev
      '/api': 'http://localhost:5000',
    },
  },
}))
