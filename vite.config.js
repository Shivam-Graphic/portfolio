import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, mkdirSync, readdirSync, existsSync } from 'fs'
import { join } from 'path'

// Copy content/*.json into public/content so they are served at runtime
function copyContentPlugin() {
  return {
    name: 'copy-content-json',
    buildStart() {
      const srcDir = join(process.cwd(), 'content')
      const destDir = join(process.cwd(), 'public', 'content')
      if (!existsSync(srcDir)) return
      mkdirSync(destDir, { recursive: true })
      for (const file of readdirSync(srcDir)) {
        if (file.endsWith('.json')) {
          copyFileSync(join(srcDir, file), join(destDir, file))
        }
      }
    },
    configureServer(server) {
      // Also serve content/ during dev
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/content/')) {
          const file = join(process.cwd(), req.url.split('?')[0])
          if (existsSync(file)) {
            res.setHeader('Content-Type', 'application/json')
            res.end(require('fs').readFileSync(file))
            return
          }
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), copyContentPlugin()],
  base: '/',
})
