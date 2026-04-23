import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Local e domínio próprio (CNAME): base "/". Só .github.io/repo sem CNAME: base "/repo/".
// No workflow de deploy, defina SITE_BASE=/ quando publicar com domínio customizado.
const customDomainAtRoot = process.env.GITHUB_ACTIONS && process.env.SITE_BASE === '/'
const repo = process.env.GITHUB_ACTIONS && !customDomainAtRoot
  ? process.env.GITHUB_REPOSITORY?.split('/').pop()
  : undefined
const base = repo ? `/${repo}/` : '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
