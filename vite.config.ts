import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.css':  'text/css',
  '.json': 'application/json',
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'serve-prototypes',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = (req.url ?? '/').split('?')[0]
          if (!url.startsWith('/prototypes/') && !url.startsWith('/welcome/')) return next()

          let rel = url.endsWith('/') ? url + 'index.html' : url
          if (!path.extname(rel)) rel += '/index.html'

          const file = path.join(process.cwd(), 'public', rel)
          if (!fs.existsSync(file)) return next()

          const ext = path.extname(file)
          res.setHeader('Content-Type', MIME[ext] ?? 'application/octet-stream')
          res.end(fs.readFileSync(file))
        })
      },
    },
  ],
})
