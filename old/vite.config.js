import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Build local: saída em `docs/` (ex.: GitHub Pages com origem /docs). Caminhos relativos.
export default defineConfig({
  base: './',
  build: {
    outDir: 'docs',
  },
  plugins: [react(), tailwindcss()],
})
