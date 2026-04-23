import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Em CI, base relativo: o mesmo dist funciona em https://<org>.github.io/<repo>/
// e no domínio próprio na raiz. (Base absoluto "/" quebrava assets em github.io/repo.)
const base = process.env.GITHUB_ACTIONS ? './' : '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
