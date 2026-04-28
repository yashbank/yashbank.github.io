import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Serve and ship `/images/*` from repo-root `images/` (single source of truth). */
function rootImagesPlugin(): Plugin {
  const imagesDir = path.resolve(__dirname, 'images')
  return {
    name: 'root-images',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const raw = req.url?.split('?')[0] ?? ''
        if (!raw.startsWith('/images/')) return next()
        const base = path.basename(raw)
        if (!/^[\w.-]+\.jpe?g$/i.test(base)) return next()
        const filePath = path.join(imagesDir, base)
        if (!filePath.startsWith(imagesDir) || !fs.existsSync(filePath)) return next()
        res.setHeader('Content-Type', 'image/jpeg')
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
        fs.createReadStream(filePath).pipe(res)
      })
    },
    closeBundle() {
      if (!fs.existsSync(imagesDir)) return
      const out = path.resolve(__dirname, 'dist/images')
      fs.mkdirSync(out, { recursive: true })
      for (const f of fs.readdirSync(imagesDir)) {
        if (!/\.jpe?g$/i.test(f)) continue
        fs.copyFileSync(path.join(imagesDir, f), path.join(out, f))
      }
    },
  }
}

// https://vite.dev/config/
// GitHub Pages user site (yashbank.github.io) uses root "/". For project pages use base: '/repo-name/'
export default defineConfig({
  base: '/',
  plugins: [react(), rootImagesPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
