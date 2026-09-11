import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(() => {
  const isNetlify = !!process.env.NETLIFY;
  const isGhPages = !isNetlify && (
    process.env.GITHUB_PAGES === 'true' || 
    process.env.npm_lifecycle_event === 'predeploy' || 
    process.env.npm_lifecycle_event === 'deploy'
  );

  return {
    // Netlify, Vercel, and local dev always use root '/'
    // GitHub Pages uses '/Aoneix/'
    base: isGhPages ? '/Aoneix/' : '/',
    plugins: [react()],
  };
})
