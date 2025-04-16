import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),         // React support
    tailwindcss(),   // Tailwind CSS support
  ],
  base: '/',         // Ensures SPA routing works properly on Vercel
})
