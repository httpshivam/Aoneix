import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // In dev mode (npm run dev), use '/' so localhost never breaks.
  // In production build, use './' so it works on GitHub Pages, Netlify, and all subpaths!
  base: command === 'serve' ? '/' : './',
  plugins: [react()],
}))
